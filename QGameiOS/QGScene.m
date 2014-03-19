//
//  QGMyScene.m
//  QGameiOS
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGScene.h"

#import "QGMusicManager.h"
#import "SKTexture+RectSubtexture.h"
#import "QGScene+BuildLevel.h"

#import "QGDataService.h"

@interface QGScene ()<SKPhysicsContactDelegate>

@end

@implementation QGScene

- (id)initWithSize: (CGSize)size
{
    if (self = [super initWithSize:size])
    {
        //[self setBackgroundColor: [SKColor colorWithRed:0.27 green:0.27 blue:0.27 alpha:1]];
        [self setBackgroundColor: [UIColor blackColor]];
        
        _doorNodes = [[NSMutableSet alloc] init];
        _messageNodes = [[NSMutableDictionary alloc] init];
        _keyTexture = [SKTexture textureWithImageNamed: @"key"];
        _doorTexture = [SKTexture textureWithImageNamed: @"door"];
        
        _currentGameInfo = [[NSMutableDictionary alloc] init];
    }
    
    return self;
}

static NSTimeInterval timeForLength(CGFloat length)
{
    return length / (4 * QGTileWidth) * 0.3;
}

static SKAction *actionForXY(CGFloat x, CGFloat y)
{
    NSTimeInterval time = 0;
    CGFloat absx = fabsf(x);
    CGFloat absy = fabsf(y);
    
    if (absx > 0)
    {
        time = timeForLength(absx);
    }else
    {
        time = timeForLength(absy);
    }
    
    return [SKAction moveByX: x
                           y: y
                    duration: time];
}

- (void)_goThroughKeyNode
{
    if (!_doorOpenedInCurrentLevel)
    {
        [_keyNode setHidden: YES];
        _doorOpenedInCurrentLevel = YES;
        [_doorNodes enumerateObjectsUsingBlock: (^(SKSpriteNode *obj, BOOL *stop)
                                                 {
                                                     [obj setHidden: YES];
                                                 })];
    }
}

- (void)_checkIfNeedShowMessageAtX: (NSInteger)x
                                 y: (NSInteger)y
{
    ++_currentLevelMoveCount;

    [self setDirection: QGDirectionNone];

    NSString *key = [NSString stringWithFormat: @"{%d,%d}", y, x];
    
    [_currentGameInfo setObject: key
                         forKey: QGPlayerLocationKey];
    
    NSDictionary *info = [_messageNodes objectForKey: key];
    
    if (info)
    {
        [_delegate scene: self
             showMessage: info[@"text"]];
    }
}

- (void)_tryMoveUpWithTileWidth: (CGFloat)tileWidth
{
    NSInteger yLooper = _playerY;
    char blockType = '\0';
    
    for (yLooper = _playerY + 1; yLooper < [_currentLevelMap count]; ++yLooper)
    {
        const char *str = [_currentLevelMap[yLooper] cStringUsingEncoding: NSUTF8StringEncoding];
        blockType = str[_playerX];
        BOOL willBreak = NO;
        //check the block
        //
        switch (blockType)
        {
            case QGWallType:
            {
                if (yLooper - 1 > _playerY)
                {
                    [_playerNode runAction: actionForXY(0, (yLooper - 1 - _playerY) * tileWidth)
                                completion: (^
                                             {
                                                 [self _checkIfNeedShowMessageAtX: _playerX
                                                                                y: yLooper - 1];
                                             })];
                    
                    _playerY = yLooper - 1;
                }
                willBreak = YES;
                break;
            }
            case QGEndType:
            {
                [_playerNode runAction: actionForXY(0, (yLooper - _playerY) * tileWidth)
                            completion: (^
                                         {
                                             [self _findWayout];
                                         })];
                
                _playerY = yLooper;
                
                willBreak = YES;
                break;
            }
            case QGKeyType:
            {
                [self _goThroughKeyNode];
                break;
            }
            case QGRiverType:
            {
                [_playerNode runAction: actionForXY(0, (yLooper - _playerY) * tileWidth)
                            completion: (^
                                         {
                                             [self _dieInRiver];
                                         })];
                
                _playerY = yLooper;
                
                willBreak = YES;
                break;
            }
            case QGDoorType:
            {
                if (_doorOpenedInCurrentLevel)
                {
                    //treat it as empty;
                    //
                }else
                {
                    //stop here
                    if (yLooper - 1 > _playerY)
                    {
                        [_playerNode runAction: actionForXY(0, (yLooper - 1 - _playerY) * tileWidth)
                                    completion: (^
                                                 {
                                                     [self _checkIfNeedShowMessageAtX: _playerX
                                                                                    y: yLooper - 1];
                                                 })];
                        
                        _playerY = yLooper - 1;
                    }
                    willBreak = YES;
                }
                break;
            }
            default:
            {
                break;
            }
        }
        
        if (willBreak)
        {
            break;
        }
    }
}

- (void)_tryToMoveDownWithTileWidth: (CGFloat)tileWidth
{
    NSInteger yLooper = _playerY;
    char blockType = '\0';
    
    for (yLooper = _playerY; yLooper >= 0; --yLooper)
    {
        const char *str = [_currentLevelMap[yLooper] cStringUsingEncoding: NSUTF8StringEncoding];
        blockType = str[_playerX];
        
        BOOL willBreak = NO;
        //check the block
        //
        switch (blockType)
        {
            case QGWallType:
            {
                if (yLooper + 1 < _playerY)
                {
                    [_playerNode runAction: actionForXY(0, (yLooper + 1 - _playerY) * tileWidth)
                                completion: (^
                                             {
                                                 [self _checkIfNeedShowMessageAtX: _playerX
                                                                                y: yLooper + 1];
                                             })];
                    _playerY = yLooper + 1;
                }
                willBreak = YES;
                
                break;
            }
            case QGEndType:
            {
                [_playerNode runAction: actionForXY(0, (yLooper - _playerY) * tileWidth)
                            completion: (^
                                         {
                                             [self _findWayout];
                                         })];
                
                _playerY = yLooper;
                
                willBreak = YES;
                break;
            }
            case QGKeyType:
            {
                [self _goThroughKeyNode];
                break;
            }
            case QGRiverType:
            {
                [_playerNode runAction: actionForXY(0, (yLooper - _playerY) * tileWidth)
                            completion: (^
                                         {
                                             [self _dieInRiver];
                                         })];
                willBreak = YES;
                break;
            }
            case QGDoorType:
            {
                if (_doorOpenedInCurrentLevel)
                {
                    //treat it as empty;
                    //
                }else
                {
                    //stop here
                    if (yLooper + 1 < _playerY)
                    {
                        [_playerNode runAction: actionForXY(0, (yLooper + 1 - _playerY) * tileWidth)
                                    completion: (^
                                                 {
                                                     [self _checkIfNeedShowMessageAtX: _playerX
                                                                                    y: yLooper + 1];
                                                 })];
                        _playerY = yLooper + 1;
                    }
                    willBreak = YES;
                }
                break;
            }
            default:
            {
                break;
            }
        }
        
        if (willBreak)
        {
            break;
        }
    }
}

- (void)_tryToMoveLeftWithTileWidth: (CGFloat)tileWidth
{
    const char *str = [_currentLevelMap[_playerY] cStringUsingEncoding: NSUTF8StringEncoding];
    NSInteger xLooper = _playerX;
    char blockType = '\0';
    
    while (xLooper >= 0)
    {
        blockType = str[xLooper];
        BOOL willBreak = NO;
        
        switch (blockType)
        {
            case QGWallType:
            {
                if (xLooper + 1 < _playerX)
                {
                    [_playerNode runAction: actionForXY((xLooper + 1 - _playerX) * tileWidth, 0)
                                completion: (^
                                             {
                                                 [self _checkIfNeedShowMessageAtX: xLooper + 1
                                                                                y: _playerY];
                                             })];
                    _playerX = xLooper + 1;
                }
                willBreak = YES;
                break;
            }
            case QGEndType:
            {
                [_playerNode runAction: actionForXY((xLooper - _playerX) * tileWidth, 0)
                            completion: (^
                                         {
                                             [self _findWayout];
                                         })];
                _playerX = xLooper;
                willBreak = YES;
                
                break;
            }
            case QGKeyType:
            {
                [self _goThroughKeyNode];
                break;
            }
            case QGRiverType:
            {
                [_playerNode runAction: actionForXY((xLooper - _playerX) * tileWidth, 0)
                            completion: (^
                                         {
                                             [self _dieInRiver];
                                         })];
                willBreak = YES;
                
                break;
            }
            case QGDoorType:
            {
                if (_doorOpenedInCurrentLevel)
                {
                    //treat it as empty;
                    //
                }else
                {
                    //stop here
                    if (xLooper + 1 < _playerX)
                    {
                        [_playerNode runAction: actionForXY((xLooper + 1 - _playerX) * tileWidth, 0)
                                    completion: (^
                                                 {
                                                     [self _checkIfNeedShowMessageAtX: xLooper + 1
                                                                                    y: _playerY];
                                                 })];
                        _playerX = xLooper + 1;
                    }
                    willBreak = YES;
                }
                break;
            }
            default:
            {
                break;
            }
        }
        
        if (willBreak)
        {
            break;
        }
        
        --xLooper;
    }
}

- (void)_tryToMoveRightWithTileWidth: (CGFloat)tileWidth
{
    const char *str = [_currentLevelMap[_playerY] cStringUsingEncoding: NSUTF8StringEncoding];
    NSInteger xLooper = _playerX;
    NSInteger max = strlen(str);
    char blockType = '\0';
    
    while (xLooper < max)
    {
        blockType = str[xLooper];
        BOOL willBreak = NO;
        
        switch (blockType)
        {
            case QGWallType:
            {
                if (xLooper - 1 > _playerX)
                {
                    [_playerNode runAction: actionForXY((xLooper - 1 - _playerX) * tileWidth, 0)
                                completion: (^
                                             {
                                                 [self _checkIfNeedShowMessageAtX: xLooper - 1
                                                                                y: _playerY];
                                             })];
                    _playerX = xLooper - 1;
                }
                willBreak = YES;
                break;
            }
            case QGEndType:
            {
                [_playerNode runAction: actionForXY((xLooper - _playerX) * tileWidth, 0)
                            completion: (^
                                         {
                                             [self _findWayout];
                                         })];
                _playerX = xLooper;
                willBreak = YES;
                
                break;
            }
            case QGKeyType:
            {
                [self _goThroughKeyNode];
                break;
            }
            case QGRiverType:
            {
                [_playerNode runAction: actionForXY((xLooper - _playerX) * tileWidth, 0)
                            completion: (^
                                         {
                                             [self _dieInRiver];
                                         })];
                willBreak = YES;
                
                break;
            }
            case QGDoorType:
            {
                if (_doorOpenedInCurrentLevel)
                {
                    //treat it as empty;
                    //
                }else
                {
                    //stop here
                    if (xLooper - 1 > _playerX)
                    {
                        [_playerNode runAction: actionForXY((xLooper - 1 - _playerX) * tileWidth, 0)
                                    completion: (^
                                                 {
                                                     [self _checkIfNeedShowMessageAtX: xLooper - 1
                                                                                    y: _playerY];
                                                 })];
                        _playerX = xLooper - 1;
                    }
                    willBreak = YES;
                }
                break;
            }
            default:
            {
                break;
            }
        }
        
        if (willBreak)
        {
            break;
        }
        ++xLooper;
    }
}

- (void)_perform
{
    NSDictionary *info = [self levelInfoAtIndex: _currentLevel];
    CGFloat tileWidth = [self widthForCurrentLevel: info];
    
    switch (_direction)
    {
        case QGDirectionUp:
        {
            [self _tryMoveUpWithTileWidth: tileWidth];
            break;
        }
        case QGDirectionDown:
        {
            [self _tryToMoveDownWithTileWidth: tileWidth];
            break;
        }
        case QGDirectionLeft:
        {
            [self _tryToMoveLeftWithTileWidth: tileWidth];
            break;
        }
        case QGDirectionRight:
        {
            [self _tryToMoveRightWithTileWidth: tileWidth];
            break;
        }
        default:
        {
            break;
        }
    }
}

- (void)update: (CFTimeInterval)currentTime
{
    
}

- (void)controlView: (QGControlView *)view
  changeToDirection: (QGDirection)d
{
    if (_direction == QGDirectionNone)
    {
        [_delegate scene: self
             showMessage: nil];
    
        [self setDirection: d];
        [self _perform];
    }
}

- (void)enterLevel: (NSInteger)index
              info: (NSDictionary *)info
{
    NSString *str = info[QGPlayerLocationKey];
    NSInteger savedMoves = [info[QGMovesKey] integerValue];
    NSInteger seconds = [info[QGTimeSecondsKey] integerValue];
    
    [_currentGameInfo setObject: [NSString stringWithFormat: @"%d", _currentLevel]
                         forKey: QGLevelKey];
    
    _direction = QGDirectionNone;
    
    [self removeAllChildren];
    
    [_messageNodes removeAllObjects];
    [_doorNodes removeAllObjects];
    _doorOpenedInCurrentLevel = NO;
    _keyNode = nil;
    _playerNode = nil;
    
    _currentLevel = index;
    
    [self buildWordForScene: self
                      level: index
               initLocation: str];
    
    //play background music
    //
    [[QGMusicManager manager] playAudio: @"violin"
                              loopCount: -1];

    [_delegate didScene: self
           enteredLevel: _currentLevel];
    
    _currentLevelMoveCount = savedMoves;
    //record time
//    if (_timeLimitMode)
    {
        [self setCurrentLevelStartTime: [NSDate dateWithTimeIntervalSinceNow: -seconds]];
    }
}

- (NSDictionary *)levelInfoAtIndex: (NSInteger)index
{
    return [[QGDataService service] levelWithIndex: index];
}

- (void)_dieInRiver
{
    [_delegate scenePlayerDieInRiver: self];
}

- (void)_findWayout
{
    ++_currentLevelMoveCount;
    [_delegate sceneFoundWayOutInCurrentLevel: self];
    
    //clear saved info
    //
    [_currentGameInfo removeAllObjects];
}

@end

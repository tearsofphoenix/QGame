//
//  QGMyScene.m
//  QGameiOS
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGScene.h"
#import "QGLevels.h"

#define QGWallColor [SKColor colorWithRed:0.8 green:0.99 blue:0.44 alpha:1]
#define QGRiverColor [SKColor colorWithRed:0.24 green:0.44 blue:0.65 alpha:1]

#define QGEmptyType '0'
#define QGWallType  '1'
#define QGEndType   '2'
#define QGRiverType '5'


@interface QGScene ()<SKPhysicsContactDelegate>
{
    QGLevels *_levels;
    NSInteger _currentLevel;
}

@property (nonatomic) QGDirection direction;

@end

@implementation QGScene

- (id)initWithSize: (CGSize)size
{
    if (self = [super initWithSize:size])
    {
        /* Setup your scene here */
        NSError *error = nil;
        NSString *str = [NSString stringWithContentsOfFile: [[NSBundle mainBundle] pathForResource: @"levels"
                                                                                            ofType: @"json"]
                                                  encoding: NSUTF8StringEncoding
                                                     error: &error];
        if (error)
        {
            NSLog(@"%@", error);
        }
        
        _levels = [[QGLevels alloc] initWithString: str];
        
        //[self setBackgroundColor: [SKColor colorWithRed:0.27 green:0.27 blue:0.27 alpha:1]];
        [self setBackgroundColor: [UIColor blackColor]];
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

- (void)_perform
{
    switch (_direction)
    {
        case QGDirectionUp:
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
                            [_playerNode runAction: actionForXY(0, (yLooper - 1 - _playerY) * QGTileWidth)];
                            
                            _playerY = yLooper - 1;
                        }
                        willBreak = YES;
                        break;
                    }
                    case QGEndType:
                    {
                        [_playerNode runAction: actionForXY(0, (yLooper - _playerY) * QGTileWidth)
                                    completion: (^
                                                 {
                                                     [self enterLevel: _currentLevel + 1];
                                                 })];
                        
                        _playerY = yLooper;
                        
                        willBreak = YES;
                        break;
                    }
                    case '3':
                    {
                        break;
                    }
                    case QGRiverType:
                    {
                        [_playerNode runAction: actionForXY(0, (yLooper - _playerY) * QGTileWidth)
                                    completion: (^
                                                 {
                                                     [self _dieInRiver];
                                                 })];
                        
                        _playerY = yLooper;
                        
                        willBreak = YES;
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
            
            
            break;
        }
        case QGDirectionDown:
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
                            [_playerNode runAction: actionForXY(0, (yLooper + 1 - _playerY) * QGTileWidth)];
                            _playerY = yLooper + 1;
                        }
                        willBreak = YES;
                        
                        break;
                    }
                    case QGEndType:
                    {
                        [_playerNode runAction: actionForXY(0, (yLooper - _playerY) * QGTileWidth)
                                    completion: (^
                                                 {
                                                     [self enterLevel: _currentLevel + 1];
                                                 })];
                        
                        _playerY = yLooper;
                        
                        willBreak = YES;
                        break;
                    }
                    case '3':
                    {
                        break;
                    }
                    case QGRiverType:
                    {
                        [_playerNode runAction: actionForXY(0, (yLooper - _playerY) * QGTileWidth)
                                    completion: (^
                                                 {
                                                     [self _dieInRiver];
                                                 })];
                        willBreak = YES;
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
            
            break;
        }
        case QGDirectionLeft:
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
                            [_playerNode runAction: actionForXY((xLooper + 1 - _playerX) * QGTileWidth, 0)
                                        completion: (^
                                                     {
                                
                                                     })];
                            _playerX = xLooper + 1;
                        }
                        willBreak = YES;
                        break;
                    }
                    case QGEndType:
                    {
                        [_playerNode runAction: actionForXY((xLooper - _playerX) * QGTileWidth, 0)
                                    completion: (^
                                                 {
                                                     [self enterLevel: _currentLevel + 1];
                                                 })];
                        _playerX = xLooper;
                        willBreak = YES;
                        
                        break;
                    }
                    case '3':
                    {
                        break;
                    }
                    case QGRiverType:
                    {
                        [_playerNode runAction: actionForXY((xLooper - _playerX) * QGTileWidth, 0)
                                    completion: (^
                                                 {
                                                     [self _dieInRiver];
                                                 })];
                        willBreak = YES;
                        
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
            
            break;
        }
        case QGDirectionRight:
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
                            [_playerNode runAction: actionForXY((xLooper - 1 - _playerX) * QGTileWidth, 0)];
                            _playerX = xLooper - 1;
                        }
                        willBreak = YES;
                        break;
                    }
                    case QGEndType:
                    {
                        [_playerNode runAction: actionForXY((xLooper - _playerX) * QGTileWidth, 0)
                                    completion: (^
                                                 {
                                                     [self enterLevel: _currentLevel + 1];
                                                 })];
                        _playerX = xLooper;
                        willBreak = YES;

                        break;
                    }
                    case '3':
                    {
                        break;
                    }
                    case QGRiverType:
                    {
                        [_playerNode runAction: actionForXY((xLooper - _playerX) * QGTileWidth, 0)
                                    completion: (^
                                                 {
                                                     [self _dieInRiver];
                                                 })];
                        willBreak = YES;
                        
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
            
            break;
        }
        default:
        {
            break;
        }
    }
    
    [self setDirection: QGDirectionNone];
}

- (void)update: (CFTimeInterval)currentTime
{
    
}

- (void)controlView: (QGControlView *)view
  changeToDirection: (QGDirection)d
{
    [self setDirection: d];
    [self _perform];
}

- (void)enterLevel: (NSInteger)index
{
    [self removeAllChildren];
    _playerNode = nil;
    _currentLevel = index;
    
    [self buildWordForScene: self
                      level: index];
    
    [_delegate didScene: self
           enteredLevel: _currentLevel];
}

- (NSDictionary *)levelInfoAtIndex: (NSInteger)index
{
    return [_levels levelInfoAtIndex: index];
}

- (void)_dieInRiver
{
    [self enterLevel: _currentLevel];
}

- (void)buildWordForScene: (QGScene *)scene
                    level: (NSInteger)index
{
    NSDictionary *info = [self levelInfoAtIndex: index];
    NSString *wordInfo = info[@"map"];
    NSArray *map = [wordInfo componentsSeparatedByString: @"\n"];

    CGFloat originX = [info[@"ox"] floatValue];
    if (originX < 0)
    {
        originX = 0;
    }
    
    CGFloat originY = [info[@"oy"] floatValue];
    
    [scene setCurrentLevelMap: map];
    
    [map enumerateObjectsUsingBlock: (^(NSString *iLooper, NSUInteger row, BOOL *stop)
                                      {
                                          const char *pChar = [iLooper cStringUsingEncoding: NSUTF8StringEncoding];
                                          char cLooper = '\0';
                                          NSInteger col = 0;
                                          
                                          while ((cLooper = *pChar))
                                          {
                                              SKSpriteNode *node = nil;
                                              switch (cLooper)
                                              {
                                                  case '0':
                                                  {
                                                      //empty
                                                      break;
                                                  }
                                                  case '1':
                                                  {
                                                      //wall solid
                                                      //
                                                      CGSize size = CGSizeMake(QGTileWidth, QGTileWidth);
                                                      node = [SKSpriteNode spriteNodeWithColor: QGWallColor
                                                                                          size: size];
                                                      break;
                                                  }
                                                  case '2':
                                                  {
                                                      //out end
                                                      break;
                                                  }
                                                  case '3':
                                                  {
                                                      //key
                                                      break;
                                                  }
                                                  case '4':
                                                  {
                                                      //door solid
                                                      break;
                                                  }
                                                  case '5':
                                                  {
                                                      //river
                                                      CGSize size = CGSizeMake(QGTileWidth, QGTileWidth);
                                                      node = [SKSpriteNode spriteNodeWithColor: QGRiverColor
                                                                                          size: size];
                                                      break;
                                                  }
                                                  default:
                                                  {
                                                      //pink
                                                      break;
                                                  }
                                              }
                                              
                                              if (node)
                                              {
                                                  [node setPosition: CGPointMake(originX + col * QGTileWidth, row * QGTileWidth + originY)];
                                                  [scene addChild: node];
                                              }
                                              
                                              ++pChar;
                                              ++col;
                                          }
                                      })];
    
    NSDictionary *playerInfo = info[@"player_coords"];
    NSInteger px = [playerInfo[@"x"] integerValue];
    NSInteger py = [playerInfo[@"y"] integerValue];
    
    [scene setPlayerX: px];
    [scene setPlayerY: py];
    
    SKSpriteNode *playerNode = [scene playerNode];
    if (!playerNode)
    {
        CGSize size = CGSizeMake(QGTileWidth - 4, QGTileWidth - 4);
        playerNode =  [SKSpriteNode spriteNodeWithColor: [UIColor whiteColor]
                                                   size: size];
        [playerNode setName: @"player"];
        [scene setPlayerNode: playerNode];
    }
    
    [playerNode setPosition: CGPointMake(originX + px * QGTileWidth, originY + py * QGTileWidth)];
    
    SKPhysicsBody *body = [SKPhysicsBody bodyWithRectangleOfSize: [playerNode size]];
    [body setAffectedByGravity: NO];
    [playerNode setPhysicsBody: body];
    
    [scene addChild: playerNode];
}

@end

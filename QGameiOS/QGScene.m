//
//  QGMyScene.m
//  QGameiOS
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGScene.h"
#import "QGLevels.h"

const uint32_t GRWallCategory     =  0x1 << 0;
const uint32_t GRRiverCategory    =  0x1 << 1;
const uint32_t GRPlayerCategory    =  0x1 << 2;
const uint32_t planetCategory      =  0x1 << 3;

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
        
        _currentLevel = 0;
        [_levels buildWordForScene: self
                             level: _currentLevel];
        
        [self setBackgroundColor: [SKColor colorWithRed:0.27 green:0.27 blue:0.27 alpha:1]];
    }
    return self;
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
                    case '1':
                    {
                        if (yLooper - 1 > _playerY)
                        {
                            SKAction *action = [SKAction moveByX: 0
                                                               y: (yLooper - 1 - _playerY) * QGTileWidth
                                                        duration: 0.3];
                            [_playerNode runAction: action];
                            
                            _playerY = yLooper - 1;
                        }
                        willBreak = YES;
                        break;
                    }
                    case '2':
                    {
                        SKAction *action = [SKAction moveByX: 0
                                                           y: (yLooper - _playerY) * QGTileWidth
                                                    duration: 0.3];
                        [_playerNode runAction: action
                                    completion: (^
                                                 {
                                                     [self _enterNextLevel: _currentLevel + 1];
                                                 })];
                        
                        _playerY = yLooper;
                        
                        willBreak = YES;
                        break;
                    }
                    case '3':
                    {
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
            
            for (yLooper = _playerY; yLooper > 0; --yLooper)
            {
                const char *str = [_currentLevelMap[yLooper] cStringUsingEncoding: NSUTF8StringEncoding];
                blockType = str[_playerX];
                
                BOOL willBreak = NO;
                //check the block
                //
                switch (blockType)
                {
                    case '1':
                    {
                        if (yLooper + 1 < _playerY)
                        {
                            SKAction *action = [SKAction moveByX: 0
                                                               y: (yLooper + 1 - _playerY) * QGTileWidth
                                                        duration: 0.3];
                            [_playerNode runAction: action];
                            _playerY = yLooper + 1;
                        }
                        willBreak = YES;
                        
                        break;
                    }
                    case '2':
                    {
                        SKAction *action = [SKAction moveByX: 0
                                                           y: (yLooper - _playerY) * QGTileWidth
                                                    duration: 0.3];
                        [_playerNode runAction: action
                                    completion: (^
                                                 {
                                                     [self _enterNextLevel: _currentLevel + 1];
                                                 })];
                        
                        _playerY = yLooper;
                        
                        willBreak = YES;
                        break;
                    }
                    case '3':
                    {
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
                    case '1':
                    {
                        if (xLooper + 1 < _playerX)
                        {
                            SKAction *action = [SKAction moveByX: (xLooper + 1 - _playerX) * QGTileWidth
                                                               y: 0
                                                        duration: 0.3];
                            [_playerNode runAction: action];
                            _playerX = xLooper + 1;
                        }
                        willBreak = YES;
                        break;
                    }
                    case '2':
                    {
                        
                        SKAction *action = [SKAction moveByX: (xLooper - _playerX) * QGTileWidth
                                                           y: 0
                                                    duration: 0.3];
                        [_playerNode runAction: action
                                    completion: (^
                                                 {
                                                     [self _enterNextLevel: _currentLevel + 1];
                                                 })];
                        _playerX = xLooper;
                        willBreak = YES;
                        
                        break;
                    }
                    case '3':
                    {
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
                    case '1':
                    {
                        if (xLooper - 1 > _playerX)
                        {
                            SKAction *action = [SKAction moveByX: (xLooper - 1 - _playerX) * QGTileWidth
                                                               y: 0
                                                        duration: 0.3];
                            [_playerNode runAction: action];
                            _playerX = xLooper - 1;
                        }
                        willBreak = YES;
                        break;
                    }
                    case '2':
                    {
                        
                        SKAction *action = [SKAction moveByX: (xLooper - _playerX) * QGTileWidth
                                                           y: 0
                                                    duration: 0.3];
                        [_playerNode runAction: action
                                    completion: (^
                                                 {
                                                     [self _enterNextLevel: _currentLevel + 1];
                                                 })];
                        _playerX = xLooper;
                        willBreak = YES;

                        break;
                    }
                    case '3':
                    {
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

- (void)_enterNextLevel: (NSInteger)index
{
    [self removeAllChildren];
    _playerNode = nil;
    _currentLevel = index;
    
    [_levels buildWordForScene: self
                         level: index];
}

@end

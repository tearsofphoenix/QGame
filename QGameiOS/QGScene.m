//
//  QGMyScene.m
//  QGameiOS
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGScene.h"

const uint32_t GRWallCategory     =  0x1 << 0;
const uint32_t GRRiverCategory    =  0x1 << 1;
const uint32_t GRPlayerCategory    =  0x1 << 2;
const uint32_t planetCategory      =  0x1 << 3;

@interface QGScene ()<SKPhysicsContactDelegate>

@property (nonatomic) QGDirection direction;

@end

@implementation QGScene

- (id)initWithSize: (CGSize)size
{
    if (self = [super initWithSize:size])
    {
        /* Setup your scene here */
        
        [self setBackgroundColor: [SKColor colorWithRed:0.15 green:0.15 blue:0.3 alpha:1.0]];
        [[self physicsWorld] setContactDelegate: self];
    }
    return self;
}

- (void)_perform
{
    switch (_direction)
    {
        case QGDirectionDown:
        {
            [[_playerNode physicsBody] setVelocity:CGVectorMake(0, -160)];
            break;
        }
        case QGDirectionUp:
        {
            [[_playerNode physicsBody] setVelocity:CGVectorMake(0, 160)];
            break;
        }
        case QGDirectionLeft:
        {
            [[_playerNode physicsBody] setVelocity:CGVectorMake(-160, 0)];
            break;
        }
        case QGDirectionRight:
        {
            [[_playerNode physicsBody] setVelocity:CGVectorMake(160, 0)];
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

- (void)didBeginContact: (SKPhysicsContact *)contact
{
    SKPhysicsBody *a = [contact bodyA];
    SKPhysicsBody *b = [contact bodyB];
    [a setVelocity: CGVectorMake(0, 0)];
    [b setVelocity: CGVectorMake(0, 0)];
    
    NSLog(@"%@, %@", [a node], [b node]);
}

@end

//
//  QGLevel.m
//  QGame
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGLevels.h"
#import "QGScene.h"

#define QGWallColor [SKColor colorWithRed:0.8 green:0.99 blue:0.44 alpha:1]
#define QGRiverColor [SKColor colorWithRed:0.24 green:0.44 blue:0.65 alpha:1]


@interface QGLevels ()
{
    NSArray *_levels;
}
@end

@implementation QGLevels

- (id)initWithString: (NSString *)str
{
    if ((self = [super init]))
    {
        NSError *error = nil;
        
        _levels = [NSJSONSerialization JSONObjectWithData: [str dataUsingEncoding: NSUTF8StringEncoding]
                                                  options: 0
                                                    error: &error];
        if (error)
        {
            NSLog(@"%@", error);
        }
    }
    
    return self;
}

- (void)buildWordForScene: (QGScene *)scene
                    level: (NSInteger)index
{
    NSDictionary *info = _levels[index];
    NSString *wordInfo = info[@"map"];
    NSArray *map = [wordInfo componentsSeparatedByString: @"\n"];
    NSInteger wallHeight = [map count];
    NSInteger wallWidth = [map[0] length];
    CGFloat originX = (320 - wallWidth * QGTileWidth) / 2;
    if (originX < 0)
    {
        originX = 0;
    }
    
    CGFloat originY = (546 - wallHeight * QGTileWidth) / 2;
    
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
        CGSize size = CGSizeMake(QGTileWidth - 2, QGTileWidth - 2);
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

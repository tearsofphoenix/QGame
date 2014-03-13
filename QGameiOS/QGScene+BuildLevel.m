//
//  QGScene+BuildLevel.m
//  QGame
//
//  Created by Mac003 on 14-3-13.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGScene+BuildLevel.h"

@implementation QGScene (BuildLevel)

- (CGFloat)widthForCurrentLevel: (NSDictionary *)info
{
    CGFloat width = QGTileWidth;
    id number = info[@"size"];
    if (number)
    {
        width = [number floatValue];
    }
    
    return width;
}

- (void)buildWordForScene: (QGScene *)scene
                    level: (NSInteger)index
{
    NSDictionary *info = [self levelInfoAtIndex: index];
    NSString *wordInfo = info[@"map"];
    NSArray *map = [wordInfo componentsSeparatedByString: @"\n"];
    
    CGFloat originX = [info[@"ox"] floatValue];
    
    CGFloat originY = [info[@"oy"] floatValue];
    if (!IsIPhone5)
    {
        originY -= 88;
    }
    
    [scene setCurrentLevelMap: map];
    
    CGFloat tileWidth = [self widthForCurrentLevel: info];
    
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
                                                  case QGEmptyType:
                                                  case QGEndType:
                                                  {
                                                      //empty
                                                      break;
                                                  }
                                                  case QGWallType:
                                                  {
                                                      //wall solid
                                                      //
                                                      CGSize size = CGSizeMake(tileWidth, tileWidth);
                                                      node = [SKSpriteNode spriteNodeWithColor: QGWallColor
                                                                                          size: size];
                                                      break;
                                                  }
                                                  case QGKeyType:
                                                  {
                                                      //key
                                                      CGSize size = CGSizeMake(tileWidth, tileWidth);
                                                      
                                                      node = [SKSpriteNode spriteNodeWithTexture: [self keyTexture]
                                                                                            size: size];
                                                      [self setKeyNode: node];
                                                      break;
                                                  }
                                                  case QGDoorType:
                                                  {
                                                      CGSize size = CGSizeMake(tileWidth, tileWidth);
                                                      
                                                      node = [SKSpriteNode spriteNodeWithTexture: [self doorTexture]
                                                                                            size: size];
                                                      [[self doorNodes] addObject: node];
                                                      //door solid
                                                      break;
                                                  }
                                                  case QGRiverType:
                                                  {
                                                      //river
                                                      CGSize size = CGSizeMake(tileWidth, tileWidth);
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
                                                  [node setPosition: CGPointMake(originX + col * tileWidth, row * tileWidth + originY)];
                                                  [scene addChild: node];
                                              }
                                              
                                              ++pChar;
                                              ++col;
                                          }
                                      })];
    
    //initialize player
    //
    NSDictionary *playerInfo = info[@"player_coords"];
    NSInteger px = [playerInfo[@"x"] integerValue];
    NSInteger py = [playerInfo[@"y"] integerValue];
    
    [scene setPlayerX: px];
    [scene setPlayerY: py];
    
    SKSpriteNode *playerNode = [scene playerNode];
    if (!playerNode)
    {
        CGSize size = CGSizeMake(tileWidth - 4, tileWidth - 4);
        playerNode =  [SKSpriteNode spriteNodeWithColor: [UIColor whiteColor]
                                                   size: size];
        [playerNode setName: @"player"];
        [scene setPlayerNode: playerNode];
    }
    
    [playerNode setPosition: CGPointMake(originX + px * tileWidth, originY + py * tileWidth)];
    
    SKPhysicsBody *body = [SKPhysicsBody bodyWithRectangleOfSize: [playerNode size]];
    [body setAffectedByGravity: NO];
    [playerNode setPhysicsBody: body];
    
    [scene addChild: playerNode];
    
    //init message nodes
    //
    NSArray *messagesInfos = info[@"messages"];
    SKTexture *messageTexture = [SKTexture textureWithImageNamed: @"message"];
    
    for (NSDictionary *mLooper in messagesInfos)
    {
        SKSpriteNode *node = [SKSpriteNode spriteNodeWithTexture: messageTexture
                                                            size: CGSizeMake(tileWidth, tileWidth)];
        NSString *str = mLooper[@"p"];
        CGPoint p = CGPointFromString(str);
        NSInteger row = p.x;
        NSInteger col = p.y;
        
        [node setPosition: CGPointMake(originX + col * tileWidth, row * tileWidth + originY)];
        [scene addChild: node];
        
        [[self messageNodes] setObject: mLooper
                                forKey: str];
    }
}

@end

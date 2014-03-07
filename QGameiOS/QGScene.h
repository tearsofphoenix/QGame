//
//  QGMyScene.h
//  QGameiOS
//

//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <SpriteKit/SpriteKit.h>
#import "QGControlView.h"

extern const uint32_t GRWallCategory;
extern const uint32_t GRRiverCategory;
extern const uint32_t GRPlayerCategory;
extern const uint32_t planetCategory;

@interface QGScene : SKScene<QGControlViewDelegate>

@property (nonatomic, weak) SKSpriteNode *playerNode;

@end

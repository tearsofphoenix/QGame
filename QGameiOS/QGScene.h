//
//  QGMyScene.h
//  QGameiOS
//

//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <SpriteKit/SpriteKit.h>
#import "QGControlView.h"

@class QGScene;
@protocol QGSceneDelegate <NSObject>

- (void)didScene: (QGScene *)scene
    enteredLevel: (NSInteger)index;

- (void)scene: (QGScene *)scene
  showMessage: (NSString *)message;

@end

@interface QGScene : SKScene<QGControlViewDelegate>

@property (nonatomic, weak) SKSpriteNode *playerNode;
@property (nonatomic) NSInteger playerX;
@property (nonatomic) NSInteger playerY;
@property (nonatomic, retain) NSArray *currentLevelMap;
@property (nonatomic, weak) id<QGSceneDelegate> delegate;

- (void)enterLevel: (NSInteger)index;

- (NSDictionary *)levelInfoAtIndex: (NSInteger)index;

@end

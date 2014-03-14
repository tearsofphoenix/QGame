//
//  QGMyScene.h
//  QGameiOS
//

//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <SpriteKit/SpriteKit.h>
#import "QGControlView.h"


#define QGWallColor [SKColor colorWithRed:0.8 green:0.99 blue:0.44 alpha:1]
#define QGRiverColor [SKColor colorWithRed:0.24 green:0.44 blue:0.65 alpha:1]

#define QGEmptyType '0'
#define QGWallType  '1'
#define QGEndType   '2'
#define QGKeyType   '3'
#define QGDoorType  '4'
#define QGRiverType '5'

#define QGTileWidth 16

#define IsIPhone5 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 1136), [[UIScreen mainScreen] currentMode].size) : NO)

#define QGPrefix            @"com.veritas.application.ios.qgame."
#define QGCurrentGameInfo   QGPrefix "current-info"

#define QGPlayerLocationKey @"location"
#define QGLevelKey          @"level"
#define QGMovesKey          @"moves"
#define QGTimeSecondsKey    @"seconds"

@class QGScene;

@protocol QGSceneDelegate <NSObject>

- (void)didScene: (QGScene *)scene
    enteredLevel: (NSInteger)index;

- (void)scene: (QGScene *)scene
  showMessage: (NSString *)message;

- (void)sceneFoundWayOutInCurrentLevel: (QGScene *)scene;

@end

@interface QGScene : SKScene<QGControlViewDelegate>

@property (nonatomic, weak) SKSpriteNode *playerNode;
@property (nonatomic) NSInteger playerX;
@property (nonatomic) NSInteger playerY;
@property (nonatomic, retain) NSArray *currentLevelMap;
@property (nonatomic, weak) id<QGSceneDelegate> delegate;

- (void)enterLevel: (NSInteger)index
              info: (NSDictionary *)info;

- (NSDictionary *)levelInfoAtIndex: (NSInteger)index;

@property (nonatomic) QGDirection direction;
@property (nonatomic) BOOL doorOpenedInCurrentLevel;
@property (nonatomic, weak) SKSpriteNode *keyNode;
@property (nonatomic, strong) NSMutableSet *doorNodes;
@property (nonatomic, strong) NSMutableDictionary *messageNodes;
@property (nonatomic, strong) SKTexture *keyTexture;
@property (nonatomic, strong) SKTexture *doorTexture;

@property (nonatomic) BOOL timeLimitMode;

@property (nonatomic) NSInteger currentLevel;
@property (nonatomic) NSInteger currentLevelMoveCount;
@property (nonatomic, strong) NSDate *currentLevelStartTime;
@property (nonatomic, strong) NSMutableDictionary *currentGameInfo;

@end

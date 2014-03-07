//
//  QGViewController.m
//  QGameiOS
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGViewController.h"
#import "QGScene.h"
#import "QGLevels.h"
#import "QGControlView.h"

@interface QGViewController ()
{
    QGLevels *_levels;
    QGControlView *_controlView;
    
}
@end

@implementation QGViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    
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

    // Configure the view.
    SKView * skView = (SKView *)self.view;
    skView.showsFPS = YES;
    skView.showsNodeCount = YES;
    
    // Create and configure the scene.
    QGScene * scene = [QGScene sceneWithSize: skView.bounds.size];
    [scene setScaleMode: SKSceneScaleModeAspectFill];
    
    // Present the scene.
    [skView presentScene: scene];
    
    [_levels buildWordForScene: scene
                         level: 0];
    
    _controlView = [[QGControlView alloc] initWithFrame: CGRectMake(0, 0, 120, 120)];
    [_controlView setDelegate: scene];
    
    [[self view] addSubview: _controlView];
}

- (BOOL)shouldAutorotate
{
    return YES;
}

- (NSUInteger)supportedInterfaceOrientations
{
    return UIInterfaceOrientationMaskPortrait;
    
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone)
    {
        return UIInterfaceOrientationMaskAllButUpsideDown;
    } else
    {
        return UIInterfaceOrientationMaskAll;
    }
}

@end

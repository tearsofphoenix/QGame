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
    QGControlView *_controlView;
}
@end

@implementation QGViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    // Configure the view.
    SKView * skView = (SKView *)self.view;
    skView.showsFPS = YES;
    skView.showsNodeCount = YES;
    
    // Create and configure the scene.
    QGScene * scene = [QGScene sceneWithSize: skView.bounds.size];
    [scene setScaleMode: SKSceneScaleModeAspectFill];
    
    // Present the scene.
    [skView presentScene: scene];
    
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

- (BOOL)prefersStatusBarHidden
{
    return YES;
}

@end

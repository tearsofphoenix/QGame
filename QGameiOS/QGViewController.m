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

@interface QGViewController ()<QGSceneDelegate>
{
    QGControlView *_controlView;
    UILabel *_titleLabel;
    UILabel *_contentLabel;
}
@end

@implementation QGViewController

- (void)viewDidLoad
{
    [super viewDidLoad];

    
    _controlView = [[QGControlView alloc] initWithFrame: CGRectMake(0, 0, 120, 120)];
    
    [[self view] addSubview: _controlView];
    UIFont *font = [UIFont fontWithName: @"HelveticaNeue-Light" //@"Baskerville-SemiBoldItalic"
                                   size: 20];
    
    _titleLabel = [[UILabel alloc] initWithFrame: CGRectMake(20, 0, 280, 60)];
    [_titleLabel setBackgroundColor: [UIColor clearColor]];
    [_titleLabel setFont: font];
    [_titleLabel setTextAlignment: NSTextAlignmentCenter];
    [_titleLabel setTextColor: [UIColor whiteColor]];
    [_titleLabel setNumberOfLines: 0];
    [[self view] addSubview: _titleLabel];
    
    _contentLabel = [[UILabel alloc] initWithFrame: CGRectMake(20, 400, 280, 60)];
    [_contentLabel setNumberOfLines: 0];
    [_contentLabel setBackgroundColor: [UIColor clearColor]];
    [_contentLabel setFont: font];
    [_contentLabel setTextAlignment: NSTextAlignmentCenter];
    [_contentLabel setTextColor: [UIColor whiteColor]];
    
    [[self view] addSubview: _contentLabel];

    // Configure the view.
    SKView * skView = (SKView *)self.view;
//    skView.showsFPS = YES;
//    skView.showsNodeCount = YES;
    
    // Create and configure the scene.
    QGScene * scene = [QGScene sceneWithSize: skView.bounds.size];
    
    [_controlView setDelegate: scene];

    [scene setScaleMode: SKSceneScaleModeAspectFill];
    [scene setDelegate: self];
    [scene enterLevel: 3];
    
    // Present the scene.
    [skView presentScene: scene];
}


- (void)_updateTextWithInfo: (NSDictionary *)info
                      label: (UILabel *)label
{
    CGFloat y = [info[@"y"] floatValue];
    CGFloat height = [info[@"h"] floatValue];
    
    [label setText: info[@"text"]];
    CGRect frame = [label frame];
    frame.origin.y = y;
    frame.size.height = height;
    
    [label setFrame: frame];
}

- (void)didScene: (QGScene *)scene
    enteredLevel: (NSInteger)index
{
    NSDictionary *info = [scene levelInfoAtIndex: index];
    NSDictionary *textInfo = info[@"title"];
    [self _updateTextWithInfo: textInfo
                        label: _titleLabel];
    
    textInfo = info[@"content"];
    [self _updateTextWithInfo: textInfo
                        label: _contentLabel];
    
    CGFloat cx = [info[@"cx"] floatValue];
    CGFloat cy = [info[@"cy"] floatValue];
    
    CGRect frame = [_controlView frame];
    frame.origin.x = cx;
    frame.origin.y = cy;
    [_controlView setFrame: frame];
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

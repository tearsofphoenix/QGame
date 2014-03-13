//
//  QGMainViewController.m
//  QGame
//
//  Created by Mac003 on 14-3-13.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGMainViewController.h"
#import "QGSettingsView.h"
#import "QGGameView.h"

@interface QGMainViewController ()

@property (nonatomic, strong) UIButton *backButton;
@property (nonatomic, strong) NSMutableArray *viewStack;

@end

@implementation QGMainViewController

- (id)initWithNibName: (NSString *)nibNameOrNil
               bundle: (NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName: nibNameOrNil
                           bundle: nibBundleOrNil];
    if (self)
    {
        _viewStack = [[NSMutableArray alloc] init];
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    _backButton = [[UIButton alloc] initWithFrame: CGRectMake(8, 8, 40, 40)];
    [_backButton setImage: [UIImage imageNamed: @"back"]
                 forState: UIControlStateNormal];
    [_backButton addTarget: self
                    action: @selector(_handleBackEvent:)
          forControlEvents: UIControlEventTouchUpInside];
    [_backButton setAlpha: 0];
    [[self view] addSubview: _backButton];
    
    UIFont *font = [UIFont fontWithName: @"Avenir-Medium"
                                   size: 20];
    
    UIButton *playButton = [[UIButton alloc] initWithFrame: CGRectMake(120, 200, 80, 44)];
    [playButton setTitle: @"Play"
                forState: UIControlStateNormal];
    [playButton setBackgroundColor: [UIColor clearColor]];
    [[playButton titleLabel] setFont: font];
    [[playButton titleLabel] setTextAlignment: NSTextAlignmentCenter];
    [playButton addTarget: self
                   action: @selector(_handlePlayEvent:)
         forControlEvents: UIControlEventTouchUpInside];
    [[self view] addSubview: playButton];
    
    UIButton *settingsButton = [[UIButton alloc] initWithFrame: CGRectMake(120, 260, 80, 44)];
    [settingsButton setBackgroundColor: [UIColor clearColor]];
    [[settingsButton titleLabel] setFont: font];
    [settingsButton setTitle: @"Settings"
                    forState: UIControlStateNormal];
    [[settingsButton titleLabel] setTextAlignment: NSTextAlignmentCenter];
    [settingsButton addTarget: self
                       action: @selector(_handleSettingsButtonEvent:)
             forControlEvents: UIControlEventTouchUpInside];
    [[self view] addSubview: settingsButton];
    
    UIButton *feedbackButton = [[UIButton alloc] initWithFrame: CGRectMake(110, 310, 100, 44)];
    [feedbackButton setBackgroundColor: [UIColor clearColor]];
    [[feedbackButton titleLabel] setFont: font];
    [[feedbackButton titleLabel] setTextAlignment: NSTextAlignmentCenter];
    [feedbackButton setTitle: @"Feedback"
                    forState: UIControlStateNormal];
    [feedbackButton addTarget: self
                       action: @selector(_handleAboutEvent:)
             forControlEvents: UIControlEventTouchUpInside];
    [[self view] addSubview: feedbackButton];
}

- (void)_pushContentView: (UIView *)view
{
    [[self view] addSubview: view];
    [view setAlpha: 0];
    
    [[self view] bringSubviewToFront: _backButton];
    [_viewStack addObject: view];
    
    [UIView animateWithDuration: 0.3
                     animations: (^
                                  {
                                      [view setAlpha: 1];
                                      [_backButton setAlpha: 1];
                                  })];
    
}

- (void)_handlePlayEvent: (id)sender
{
    QGGameView *gameView = [[QGGameView alloc] initWithFrame: [[self view] bounds]];
    [self _pushContentView: gameView];
}

- (void)_handleSettingsButtonEvent: (id)sender
{
    QGSettingsView *view = [[QGSettingsView alloc] initWithFrame: [[self view] bounds]];
    [self _pushContentView: view];
}

- (void)_handleAboutEvent: (id)sender
{
	NSString *mailString = [NSString stringWithFormat:@"mailto:?to=%@&subject=%@&body=%@",
							[@"tearsofphoenix@icloud.com" stringByAddingPercentEscapesUsingEncoding: NSUTF8StringEncoding],
							[@"Feedback of QGame" stringByAddingPercentEscapesUsingEncoding: NSUTF8StringEncoding],
							[@""  stringByAddingPercentEscapesUsingEncoding: NSUTF8StringEncoding]];
    
    NSURL *url = [NSURL URLWithString: mailString];
    
    if ([[UIApplication sharedApplication] canOpenURL: url])
    {
        [[UIApplication sharedApplication] openURL: [NSURL URLWithString: mailString]];
    }else
    {
        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle: nil
                                                            message: @"Your device does not support email!"
                                                           delegate: nil
                                                  cancelButtonTitle: @"OK"
                                                  otherButtonTitles: nil];
        [alertView show];
    }
}

- (void)_handleBackEvent: (id)sender
{
    UIView *currentView = [_viewStack lastObject];
    
    [UIView animateWithDuration: 0.3
                     animations: (^
                                  {
                                      [currentView setAlpha: 0];
                                      if ([_viewStack count] == 1)
                                      {
                                          [_backButton setAlpha: 0];
                                      }
                                  })
                     completion: (^(BOOL finished)
                                  {
                                      [currentView removeFromSuperview];
                                      [_viewStack removeLastObject];
                                  })];
}

#pragma mark --- orientation

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

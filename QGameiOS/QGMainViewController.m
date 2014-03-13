//
//  QGMainViewController.m
//  QGame
//
//  Created by Mac003 on 14-3-13.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGMainViewController.h"

@interface QGMainViewController ()

@end

@implementation QGMainViewController

- (id)initWithNibName: (NSString *)nibNameOrNil
               bundle: (NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName: nibNameOrNil
                           bundle: nibBundleOrNil];
    if (self)
    {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    UIButton *playButton = [[UIButton alloc] initWithFrame: CGRectMake(125, 100, 70, 44)];
    [playButton setTitle: @"Play"
                forState: UIControlStateNormal];
    [playButton setBackgroundColor: [UIColor clearColor]];
    [playButton addTarget: self
                   action: @selector(_handlePlayEvent:)
         forControlEvents: UIControlEventTouchUpInside];
    [[self view] addSubview: playButton];
    
    UIButton *settingsButton = [[UIButton alloc] initWithFrame: CGRectMake(125, 160, 70, 44)];
    [settingsButton setBackgroundColor: [UIColor clearColor]];
    [settingsButton setTitle: @"Settings"
                    forState: UIControlStateNormal];
    [settingsButton addTarget: self
                       action: @selector(_handleSettingsButtonEvent:)
             forControlEvents: UIControlEventTouchUpInside];
    [[self view] addSubview: settingsButton];
    
    UIButton *aboutButton = [[UIButton alloc] initWithFrame: CGRectMake(125, 210, 70, 44)];
    [aboutButton setBackgroundColor: [UIColor clearColor]];
    [aboutButton setTitle: @"Abount"
                 forState: UIControlStateNormal];
    [aboutButton addTarget: self
                    action: @selector(_handleAboutEvent:)
          forControlEvents: UIControlEventTouchUpInside];
    [[self view] addSubview: aboutButton];
}

- (void)_handlePlayEvent: (id)sender
{
    
}

- (void)_handleSettingsButtonEvent: (id)sender
{
    
}

- (void)_handleAboutEvent: (id)sender
{
    
}

@end

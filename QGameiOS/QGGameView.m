//
//  QGViewController.m
//  QGameiOS
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGGameView.h"
#import "QGScene.h"
#import "QGLevels.h"
#import "QGControlView.h"
#import "QGNoticeView.h"

@interface QGGameView ()<QGSceneDelegate>
{
    QGControlView *_controlView;
    UILabel *_titleLabel;
    UILabel *_contentLabel;
    UILabel *_messageLabel;
}

@property (nonatomic, strong) QGNoticeView *noticeView;

@end

@implementation QGGameView

- (id)initWithFrame: (CGRect)frame
{
    if (self = [super initWithFrame: frame])
    {
        
        SKView *view = self;
        
        _controlView = [[QGControlView alloc] initWithFrame: CGRectMake(0, 0, 120, 120)];
        
        [view addSubview: _controlView];
        UIFont *font = [UIFont fontWithName: @"HelveticaNeue-Light" //@"Baskerville-SemiBoldItalic"
                                       size: 18.5];
        
        _titleLabel = [[UILabel alloc] initWithFrame: CGRectMake(20, 0, 280, 60)];
        [_titleLabel setBackgroundColor: [UIColor clearColor]];
        [_titleLabel setFont: font];
        [_titleLabel setTextAlignment: NSTextAlignmentCenter];
        [_titleLabel setTextColor: [UIColor whiteColor]];
        [_titleLabel setNumberOfLines: 0];
        [view addSubview: _titleLabel];
        
        _contentLabel = [[UILabel alloc] initWithFrame: CGRectMake(10, 400, 300, 60)];
        [_contentLabel setNumberOfLines: 0];
        [_contentLabel setBackgroundColor: [UIColor clearColor]];
        [_contentLabel setFont: font];
        [_contentLabel setTextAlignment: NSTextAlignmentCenter];
        [_contentLabel setTextColor: [UIColor whiteColor]];
        
        [view addSubview: _contentLabel];
        
        //
        _messageLabel = [[UILabel alloc] initWithFrame: CGRectMake(10, 300, 300, 160)];
        [_messageLabel setNumberOfLines: 0];
        [_messageLabel setBackgroundColor: [UIColor clearColor]];
        [_messageLabel setFont: [UIFont fontWithName: @"Baskerville-SemiBoldItalic"
                                                size: 18]];
        [_messageLabel setTextAlignment: NSTextAlignmentCenter];
        [_messageLabel setTextColor: [UIColor whiteColor]];
        
        [view addSubview: _messageLabel];
        
        // Create and configure the scene.
        QGScene * scene = [QGScene sceneWithSize: [self bounds].size];
        
        [_controlView setDelegate: scene];
        
        [scene setScaleMode: SKSceneScaleModeAspectFill];
        [scene setDelegate: self];
        [scene enterLevel: 0];
        
        // Present the scene.
        [self presentScene: scene];
        
        [[NSNotificationCenter defaultCenter] addObserver: self
                                                 selector: @selector(_notificationForActive:)
                                                     name: UIApplicationWillEnterForegroundNotification
                                                   object: nil];
        [[NSNotificationCenter defaultCenter] addObserver: self
                                                 selector: @selector(_notificationForActive:)
                                                     name: UIApplicationDidBecomeActiveNotification
                                                   object: nil];

        [[NSNotificationCenter defaultCenter] addObserver: self
                                                 selector: @selector(_notificationForEnactive)
                                                     name: UIApplicationDidEnterBackgroundNotification
                                                   object: nil];
        [[NSNotificationCenter defaultCenter] addObserver: self
                                                 selector: @selector(_notificationForEnactive)
                                                     name: UIApplicationWillResignActiveNotification
                                                   object: nil];
        [[NSNotificationCenter defaultCenter] addObserver: self
                                                 selector: @selector(_notificationForEnactive)
                                                     name: UIApplicationWillTerminateNotification
                                                   object: nil];
    }
    
    return self;
}

- (void)_notificationForActive: (NSNotification *)notification
{
    [self setPaused: NO];
}

- (void)_notificationForEnactive
{
    [self setPaused: YES];
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver: self];
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

- (void)scene: (QGScene *)scene
  showMessage: (NSString *)message
{
    [_messageLabel setText: message];
}

- (void)sceneFoundWayOutInCurrentLevel: (QGScene *)scene
{
    if (!_noticeView)
    {
        _noticeView = [[QGNoticeView alloc] initWithFrame: CGRectMake(40, 180, 240, 190)];
        [self addSubview: _noticeView];
    }
    
    [self bringSubviewToFront: _noticeView];
    [_noticeView setAlpha: 0];
    
    [UIView animateWithDuration: 0.3
                     animations: (^
                                  {
                                      [_noticeView setAlpha: 1];
                                  })];
}

@end

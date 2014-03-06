//
//  QGViewController.m
//  QGame
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGViewController.h"
#import "QGControlView.h"

@interface QGViewController ()<UIWebViewDelegate, QGControlViewDelegate>

@property (strong, nonatomic) UIWebView *webView;

@end

@implementation QGViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    _webView = [[UIWebView alloc] initWithFrame: [[self view] bounds]];
    [[self view] addSubview: _webView];
    
    NSURL *url = [[NSBundle mainBundle] URLForResource: @"Q"
                                         withExtension: @"html"];
    
    //    url = [NSURL URLWithString: @"http://lapiroff.name/orderlies/Q/#0"];
    
    NSURLRequest *request = [NSURLRequest requestWithURL: url];
    
    //[_webView setDelegate: self];
    [_webView setUserInteractionEnabled: NO];
    [_webView loadRequest: request];
    
    QGControlView *controlView = [[QGControlView alloc] initWithFrame: CGRectMake(0, 0, 120, 120)];
    [controlView setDelegate: self];
    [[self view] addSubview: controlView];
}

- (BOOL)shouldAutorotate
{
    return YES;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return UIInterfaceOrientationIsLandscape(interfaceOrientation);
}

- (NSUInteger)supportedInterfaceOrientations
{
    return UIInterfaceOrientationLandscapeLeft | UIInterfaceOrientationLandscapeRight;
}

- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation
{
    return UIInterfaceOrientationLandscapeLeft;
}

- (BOOL)prefersStatusBarHidden
{
    return YES;
}


- (BOOL)webView: (UIWebView *)webView
shouldStartLoadWithRequest: (NSURLRequest *)request
 navigationType: (UIWebViewNavigationType)navigationType
{
    NSLog(@"%@", [request URL]);
    
    return YES;
}

- (void)     webView: (UIWebView *)webView
didFailLoadWithError: (NSError *)error
{
    NSLog(@"%@", error);
}

- (void)controlView: (QGControlView *)view
  changeToDirection: (QGDirection)d
{
    NSString *command = nil;
    switch (d)
    {
        case QGDirectionUp:
        {
            break;
        }
        case QGDirectionDown:
        {
            break;
        }
        case QGDirectionLeft:
        {
            break;
        }
        case QGDirectionRight:
        {
            break;
        }
        default:
            break;
    }
    
    if (command)
    {
        [_webView stringByEvaluatingJavaScriptFromString: command];
    }
}

@end

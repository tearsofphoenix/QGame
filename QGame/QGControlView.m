//
//  QGControlView.m
//  QGame
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGControlView.h"
#import <QuartzCore/QuartzCore.h>

@implementation QGControlView

- (id)initWithFrame: (CGRect)frame
{
    self = [super initWithFrame: frame];
    if (self)
    {
        [self setBackgroundColor: [UIColor colorWithWhite: 0.9
                                                    alpha: 0.8]];
        [[self layer] setCornerRadius: 60];
        [self setClipsToBounds: YES];
        
        UIButton *upButton = [[UIButton alloc] initWithFrame: CGRectMake(40, 0, 48, 48)];
//        [upButton setBackgroundColor: [UIColor redColor]];
        [upButton setShowsTouchWhenHighlighted: YES];
        [upButton addTarget: self
                     action: @selector(_handleUpButtonTappedEvent:)
           forControlEvents: UIControlEventTouchUpInside];
        [upButton setImage: [UIImage imageNamed: @"up"]
                  forState: UIControlStateNormal];
        [self addSubview: upButton];
        
        UIButton *leftButton = [[UIButton alloc] initWithFrame: CGRectMake(0, 40, 48, 48)];
//        [leftButton setBackgroundColor: [UIColor greenColor]];
        [leftButton setShowsTouchWhenHighlighted: YES];
        [leftButton addTarget: self
                       action: @selector(_handleLeftButtonTappedEvent:)
             forControlEvents: UIControlEventTouchUpInside];
        [leftButton setImage: [UIImage imageNamed: @"left"]
                    forState: UIControlStateNormal];
        [self addSubview: leftButton];
        
        UIButton *rightButton = [[UIButton alloc] initWithFrame: CGRectMake(80, 40, 48, 48)];
//        [rightButton setBackgroundColor: [UIColor blueColor]];
        [rightButton setShowsTouchWhenHighlighted: YES];
        [rightButton addTarget: self
                        action: @selector(_handleRightButtonTappedEvent:)
              forControlEvents: UIControlEventTouchUpInside];
        [rightButton setImage: [UIImage imageNamed: @"right"]
                     forState: UIControlStateNormal];
        [self addSubview: rightButton];
        
        UIButton *downButton = [[UIButton alloc] initWithFrame: CGRectMake(40, 80, 48, 48)];
        [downButton setShowsTouchWhenHighlighted: YES];
        [downButton addTarget: self
                       action: @selector(_handleDownButtonTappedEvent:)
             forControlEvents: UIControlEventTouchUpInside];
        [downButton setImage: [UIImage imageNamed: @"down"]
                    forState: UIControlStateNormal];
        [self addSubview: downButton];
    }
    return self;
}

- (void)_handleUpButtonTappedEvent: (id)sender
{
    [_delegate controlView: self
         changeToDirection: QGDirectionUp];
}

- (void)_handleLeftButtonTappedEvent: (id)sender
{
    [_delegate controlView: self
         changeToDirection: QGDirectionLeft];
}

- (void)_handleRightButtonTappedEvent: (id)sender
{
    [_delegate controlView: self
         changeToDirection: QGDirectionRight];
}

- (void)_handleDownButtonTappedEvent: (id)sender
{
    [_delegate controlView: self
         changeToDirection: QGDirectionDown];
}

@end

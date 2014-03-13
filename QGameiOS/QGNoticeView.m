//
//  QGNoticeView.m
//  QGame
//
//  Created by Mac003 on 14-3-13.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGNoticeView.h"
#import <QuartzCore/QuartzCore.h>

@interface QGNoticeView ()

@property (nonatomic, strong) UILabel *titleLabel;
@property (nonatomic, strong) UILabel *contentLabel;

@end

@implementation QGNoticeView

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self)
    {
        [self setBackgroundColor: [UIColor colorWithRed: 0.06
                                                  green: 0.11
                                                   blue: 0.07
                                                  alpha: 0.8]];
        [self setAlpha: 0.3];
        [[self layer] setBorderColor: [[UIColor whiteColor] CGColor]];
        [[self layer] setBorderWidth: 2];
        
        CGFloat width = frame.size.width;
        
        _titleLabel = [[UILabel alloc] initWithFrame: CGRectMake(0, 0, width, 40)];
        [_titleLabel setBackgroundColor: [UIColor clearColor]];
        [_titleLabel setTextAlignment: NSTextAlignmentCenter];
        [_titleLabel setTextColor: [UIColor whiteColor]];
        [_titleLabel setText: @"Congratulations!"];
        [self addSubview: _titleLabel];
        
        _contentLabel = [[UILabel alloc] initWithFrame: CGRectMake(0, 40, width, 80)];
        [_contentLabel setBackgroundColor: [UIColor clearColor]];
        [_contentLabel setNumberOfLines: 0];
        [_contentLabel setTextAlignment: NSTextAlignmentCenter];
        [_contentLabel setTextColor: [UIColor whiteColor]];
        
        [self addSubview: _contentLabel];
        
        UIButton *nextLevel = [[UIButton alloc] initWithFrame: CGRectMake(10, 130, 220, 40)];

        [[nextLevel layer] setBorderWidth: 2];
        [[nextLevel layer] setBorderColor: [[UIColor whiteColor] CGColor]];
        [nextLevel setTitle: @"Next Level"
                   forState: UIControlStateNormal];
        [nextLevel addTarget: self
                      action: @selector(_handleNextLevelEvent:)
            forControlEvents: UIControlEventTouchUpInside];
        [self addSubview: nextLevel];
    }
    return self;
}

- (void)_handleNextLevelEvent: (id)sender
{
    
}

@end

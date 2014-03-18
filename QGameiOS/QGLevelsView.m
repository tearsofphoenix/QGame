//
//  QGLevelsView.m
//  QGame
//
//  Created by Lei on 14-3-18.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGLevelsView.h"
#import "QGDataService.h"

@interface QGLevelsView ()<UIScrollViewDelegate>
{
    UIScrollView *_scrollView;
    UIPageControl *_pageControl;
}
@end

@implementation QGLevelsView

- (id)initWithFrame: (CGRect)frame
{
    self = [super initWithFrame: frame];
    if (self)
    {
        _scrollView = [[UIScrollView alloc] initWithFrame: CGRectMake(0, 100, 320, 300)];
        [_scrollView setBackgroundColor: [UIColor whiteColor]];
        [_scrollView setPagingEnabled: YES];
        [_scrollView setContentSize: CGSizeMake(320 * 10, 300)];
        [_scrollView setDelegate: self];
        
        [self addSubview: _scrollView];
        
        _pageControl = [[UIPageControl alloc] initWithFrame: CGRectMake(0, 400, 320, 40)];
        [_pageControl setNumberOfPages: [[QGDataService service] levelCount]];
        
        [self addSubview: _pageControl];
    }
    return self;
}

- (void)contentViewWillDisappear
{
    
}

- (void)loadScrollViewWithPage: (NSUInteger)page
{
    
}


- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
    // switch the indicator when more than 50% of the previous/next page is visible
    CGFloat pageWidth = CGRectGetWidth([_scrollView frame]);
    NSUInteger page = floor(([_scrollView contentOffset].x - pageWidth / 2) / pageWidth) + 1;
    [_pageControl setCurrentPage: page];
    
}

@end

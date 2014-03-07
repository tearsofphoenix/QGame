//
//  QGControlView.h
//  QGame
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <UIKit/UIKit.h>

enum
{
    QGDirectionNone = 0,
    QGDirectionLeft,
    QGDirectionRight,
    QGDirectionUp,
    QGDirectionDown,
};

typedef NSUInteger QGDirection;

@class QGControlView;

@protocol QGControlViewDelegate <NSObject>

- (void)controlView: (QGControlView *)view
  changeToDirection: (QGDirection)d;

@end

@interface QGControlView : UIView

@property (nonatomic, assign) id<QGControlViewDelegate> delegate;

@end

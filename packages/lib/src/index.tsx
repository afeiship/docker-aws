import React, { Component } from 'react';
import Tippy from '@tippyjs/react';
import ActivityCalendar, { ThemeInput, Props, Activity } from 'react-activity-calendar';
import { standardCalendar } from './helper';

const CLASS_NAME = 'react-calendar-graph';

// GitHub theme
export const DEFAULT_THEME: ThemeInput = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

export type ReactCalendarGraphProps = {
  /**
   * The extended className for component.
   */
  className?: string;
} & Omit<Props, 'renderBlock'>;

/*
From github:
--color-calendar-graph-day-bg: #ebedf0;
--color-calendar-graph-day-border: rgba(27, 31, 35, 0.06);
--color-calendar-graph-day-L1-bg: #9be9a8;
--color-calendar-graph-day-L2-bg: #40c463;
--color-calendar-graph-day-L3-bg: #30a14e;
--color-calendar-graph-day-L4-bg: #216e39;
 */

export default class ReactCalendarGraph extends Component<ReactCalendarGraphProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps: ReactCalendarGraphProps = {
    data: [],
    showWeekdayLabels: false,
    hideTotalCount: true,
    hideColorLegend: true,
  };

  get data() {
    const { data } = this.props;
    return standardCalendar(data);
  }

  renderBlock = (block, activity) => {
    return <Tippy content={`${activity.count} activities on ${activity.date}`}>{block}</Tippy>;
  };

  render() {
    const { data, ...rest } = this.props;
    if (!data?.length) return null;

    return (
      <ActivityCalendar
        data={this.data as Activity[]}
        theme={DEFAULT_THEME}
        renderBlock={this.renderBlock}
        {...rest}
      />
    );
  }
}

import classNames from 'classnames';
import React, { Component } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import ActivityCalendar, { ThemeInput } from 'react-activity-calendar';
import { standardCalendar } from './helper';

const CLASS_NAME = 'react-calendar-graph';

// GitHub theme
export const DEFAULT_THEME: ThemeInput = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
};

export type ReactCalendarGraphProps = {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * The data source.
   */
  items?: any[];
  /**
   * The calendar-graph instance options.
   */
  graphOptions?: any;
};

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
  static defaultProps = {
    items: [],
    graphOptions: {}
  };

  get data() {
    const { items } = this.props;
    return standardCalendar(items);
  }

  renderBlock = (block, activity) => {
    return React.cloneElement(block, {
      'data-tooltip-id': 'react-tooltip',
      'data-tooltip-html': `${activity.count} activities on ${activity.date}`
    });
  };

  render() {
    const { className, items, graphOptions, ...props } = this.props;
    return (
      <section data-component={CLASS_NAME} className={classNames(CLASS_NAME, className)} {...props}>
        <ActivityCalendar
          data={this.data as any}
          theme={DEFAULT_THEME}
          renderBlock={this.renderBlock}
          {...graphOptions}
        />
        <ReactTooltip id="react-tooltip" />
      </section>
    );
  }
}

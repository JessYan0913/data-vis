import { parseStyle } from '../../utils/data-vis-util';

const statisticText = function(props) {
  const { selection, style, formatter } = props;
  const text = selection
    .append('text')
    .attr('text-anchor', 'middle')
    .text(() => formatter());
  parseStyle(text, style);
};

export class Statistic {
  constructor(props) {
    const { title, content } = props;
    this.title = title;
    this.content = content;
  }

  render({ selection }) {
    statisticText({
      selection,
      style: this.title.style,
      formatter: this.title.formatter
    });
    statisticText({
      selection,
      style: { ...this.content.style, dy: 20 },
      formatter: this.content.formatter
    });
  }
}

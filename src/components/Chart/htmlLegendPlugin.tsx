import { makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  checked: boolean;
  label: string;
  color: string;
  name: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    '& .Mui-checked': {
      color: (props: any) => props.color,
    },

    '& .MuiTypography-root': {
      fontFamily: 'inherit',
      fontSize: '0.875rem',
      fontWeight: 400,
    },
  },
}));

const LegendCheckBox: React.FC<IProps> = ({ checked, label, color, name }) => {
  const classes = useStyles({ color });
  return (
    <FormControlLabel className={classes.root} control={<Checkbox checked={checked} name={name} />} label={label} />
  );
};

const getOrCreateLegendList = (chart: any, id: any) => {
  const legendContainer = document.getElementById(id);
  if (legendContainer) {
    let listContainer = legendContainer.querySelector('ul');

    if (!listContainer) {
      listContainer = document.createElement('ul');
      listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'row';
      listContainer.style.flexWrap = 'wrap';
      listContainer.style.margin = '0';
      listContainer.style.padding = '0';

      legendContainer.appendChild(listContainer);
    }

    return listContainer;
  }

  return null;
};

const HtmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart: any, args: any, options: any) {
    const ul = getOrCreateLegendList(chart, options.containerID);
    if (ul) {
      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }

      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);

      items.forEach((item: any) => {
        const li = document.createElement('li');
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.marginLeft = '10px';

        li.onclick = () => {
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
          chart.update();
        };

        ReactDOM.render(
          <LegendCheckBox checked={!item.hidden} label={item.text} color={item.fillStyle} name={item.id} />,
          li
        );
        ul.appendChild(li);
      });
    }
  },
};

export default HtmlLegendPlugin;

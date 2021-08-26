import useStyles from './styles';
import { ITabPanelItem } from './types';

interface ITabPanelProps {
  tabPanels: Array<ITabPanelItem>;
  value: number;
}

const TabPanel: React.FC<ITabPanelProps> = ({ tabPanels, value, ...other }) => {
  const classes = useStyles();
  return (
    <>
      {tabPanels.map((tabPanel, index) => {
        return (
          <div className={classes.tabPanels} key={index} role="tabpanel" hidden={value !== index} {...other}>
            <>{value === index && tabPanel.component}</>
          </div>
        );
      })}
    </>
  );
};

export default TabPanel;

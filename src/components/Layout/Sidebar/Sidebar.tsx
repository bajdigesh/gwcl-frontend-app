import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { logo } from 'assets/images';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { sideBarList } from './sibarBarList';
import useStyles from './styles';

type TSidebarProps = {};

const Sidebar: React.FC<TSidebarProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <div className={classes.sidebarContent}>
        <h1 className={classes.logoContainer}>
          <img src={logo} alt="GWCL Logo" />
        </h1>
        <List>
          {sideBarList.map(({ icon: IconComponent, label, path }, key: number) => (
            <ListItem className={classes.item} key={key}>
              <NavLink className={classes.sideBarMenu} to={path} activeClassName={'active'}>
                <i>
                  <IconComponent />
                </i>
                {/* @ts-ignore */}
                <p>{t(`${label}`)}</p>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export default Sidebar;

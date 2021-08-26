import { Avatar, Box, Hidden, MenuItem, MenuList, Typography } from '@material-ui/core';
import { ArrowDownIcon, ArrowSignDownIcon, FranceIcon, LanguageChangeIcon, LogoutIcon, USAIcon } from 'assets/images';
import searchIcon from 'assets/images/icons/search.svg';
import Button from 'components/Button';
import CustomizedDropdown from 'components/Dropdown/CustomizedDropdown';
import { LANG } from 'global/constants';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import tokenService from 'service/tokenService';
import { postLogout, selectUser } from 'store/authentication';
import useStyles from './styles';

const Header: React.FC<any> = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const accessToken = tokenService.getAccessToken();
  const { t, i18n } = useTranslation(['common']);

  const languageOptions = useMemo(() => {
    return [
      { label: t('common:english'), value: LANG.ENGLISH, icon: <USAIcon /> },
      { label: t('common:french'), value: LANG.FRENCH, icon: <FranceIcon /> },
    ];
  }, [t]);

  const handleLogoutClick = () => {
    dispatch(postLogout());
  };

  useEffect(() => {
    if (!user && !accessToken) {
      history.push('/auth');
    }
  }, [user, history, accessToken]);

  const handleLanguageItemClick = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = useMemo(() => languageOptions.find((lang: any) => lang.value === i18n.language), [
    i18n.language,
    languageOptions,
  ]);

  return (
    <Box display="grid" gridGap={16} alignItems="center" justifyContent="center" className={classes.gridDisplay}>
      <form className={classes.topSearchForm}>
        <i>
          <img src={searchIcon} alt="" />
        </i>
        <input type="text" placeholder={t('common:headerSearch')} />
      </form>

      <Hidden smDown implementation="css">
        <Box position="relative" display="flex" alignItems="center" justifyContent="space-between">
          <div className={classes.languageDropdown}>
            <CustomizedDropdown
              open={true}
              renderTriggerElement={handleClick => (
                <Button
                  disableElevation
                  variant="text"
                  startIcon={currentLanguage?.icon}
                  endIcon={<ArrowSignDownIcon />}
                  onClick={handleClick}
                >
                  {currentLanguage?.label}
                </Button>
              )}
            >
              {handleClose =>
                languageOptions.map((item: any, index: number) => (
                  <MenuItem
                    key={index}
                    className={classes.languageDropdownMenuItem}
                    onClick={() => {
                      handleLanguageItemClick(item.value);
                      handleClose();
                    }}
                  >
                    <span className="icon">{item.icon}</span>
                    <span className="text">{item.label}</span>
                  </MenuItem>
                ))
              }
            </CustomizedDropdown>
          </div>

          {/* <figure className={classes.userImage}>
            <Avatar data-initial={user?.first_name.substring(0, 1)} alt={user?.first_name} src="" />
          </figure>

          <div
            className={classes.logoutButton}
            role="button"
            onClick={() => {
              handleLogoutClick();
            }}
          >
            <Tooltip title={t('common:logout')} arrow>
              <LogoutIcon />
            </Tooltip>
          </div> */}

          <CustomizedDropdown
            open={true}
            renderTriggerElement={handleClick => (
              <figure className={classes.userImage} onClick={handleClick}>
                <Avatar data-initial={user?.first_name.substring(0, 1)} alt={user?.first_name} src="" />
              </figure>
            )}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            className={classes.userMenus}
          >
            {handleClose => (
              <div>
                <MenuItem className={classes.userNameInfo}>
                  <Box display="flex" alignItems="center">
                    <figure className={classes.userImage}>
                      <Avatar data-initial={user?.first_name.substring(0, 1)} alt={user?.first_name} src="" />
                    </figure>
                    <span>
                      {user?.first_name} {user?.last_name}
                    </span>
                  </Box>
                </MenuItem>
                <MenuItem
                  className={classes.logoutButton}
                  role="button"
                  onClick={() => {
                    handleLogoutClick();
                    handleClose();
                  }}
                >
                  <LogoutIcon />
                  {t('common:logout')}
                </MenuItem>
              </div>
            )}
          </CustomizedDropdown>
        </Box>
      </Hidden>

      <Hidden mdUp implementation="css">
        <CustomizedDropdown
          open={true}
          renderTriggerElement={handleClick => (
            <figure className={classes.userImage} onClick={handleClick}>
              <Avatar data-initial={user?.first_name.substring(0, 1)} alt={user?.first_name} src="" />
            </figure>
          )}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          className={classes.userMenus}
        >
          {handleClose => (
            <div>
              <MenuItem className={classes.userNameInfo}>
                <Box display="flex" alignItems="center">
                  <figure className={classes.userImage}>
                    <Avatar data-initial={user?.first_name.substring(0, 1)} alt={user?.first_name} src="" />
                  </figure>
                  <span>
                    {user?.first_name} {user?.last_name}
                  </span>
                </Box>
              </MenuItem>
              <MenuItem className={classes.changeLanguage}>
                <Typography>
                  <LanguageChangeIcon />
                  <span>{t('common:changeLanguage')}</span>
                  <ArrowDownIcon />
                </Typography>
                <MenuList className={classes.appLanguages}>
                  {languageOptions.map(({ label, icon: Icon, value }: any, index: number) => {
                    return (
                      <MenuItem
                        key={index}
                        onClick={() => handleLanguageItemClick(value)}
                        selected={value === i18n.language}
                      >
                        {Icon}
                        {label}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </MenuItem>
              <MenuItem
                className={classes.logoutButton}
                role="button"
                onClick={() => {
                  handleLogoutClick();
                  handleClose();
                }}
              >
                <LogoutIcon />
                {t('common:logout')}
              </MenuItem>
            </div>
          )}
        </CustomizedDropdown>
      </Hidden>
    </Box>
  );
};

export default Header;

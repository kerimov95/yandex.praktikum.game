import './MainMenu.css';

import { ROUTES, THEME } from 'common/consts';
import { t } from 'common/dictionary';
import { useThunkAction } from 'common/hooks/actionHooks';
import React, { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Menu } from 'semantic-ui-react';
import { logOutAction } from 'store/actions/auth';
import { getAuthSelector, getThemeSelector } from 'store/selectors';
import { Checkbox, Icon, CheckboxProps } from 'semantic-ui-react';
import { getTheme, setUserTheme } from 'store/actions/theme';

const MainMenu: FC = () => {
  const activeItem = useLocation().pathname;
  const history = useHistory();

  const isAuth = useSelector(getAuthSelector);
  const theme = useSelector(getThemeSelector);

  const logOut = useThunkAction(logOutAction);
  const getThemeAction = useThunkAction(getTheme);
  const setThemeAction = useThunkAction(setUserTheme);

  useEffect(() => {
    isAuth && getThemeAction();
  }, [isAuth]);

  const handleSignInAndLogOut = () => {
    isAuth && logOut();
    history.push(ROUTES.SIGNIN);
  };

  const handleClick = (path: string) => () => history.push(path);

  const changeTheme = (_event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    data.checked ? setThemeAction(THEME.DARK) : setThemeAction(THEME.LIGHT);
  };

  const items = useMemo(
    () => [
      {
        name: t('homeTitle'),
        path: ROUTES.HOME,
        visible: true,
      },
      {
        name: t('profileTitle'),
        path: ROUTES.PROFILE,
        visible: isAuth,
      },
      {
        name: t('forumTitle'),
        path: ROUTES.FORUM,
        visible: isAuth,
      },
      {
        name: t('leaderboardTitle'),
        path: ROUTES.LEADERBOARD,
        visible: isAuth,
      },
    ],
    [isAuth]
  );

  return (
    <Menu className={`main-menu ${theme} layout__main-menu`}>
      {items
        .filter((item) => item.visible)
        .map((item, key) => (
          <Menu.Item
            className="main-menu__item"
            key={`unique${key.toString()}`}
            active={activeItem === item.path}
            onClick={handleClick(item.path)}
          >
            {item.name}
          </Menu.Item>
        ))}
      <Menu.Menu position="right">
        <div className="toggle_theme">
          <Icon className="toggle_theme__icon" name="sun" size="large" color="yellow" />
          <Checkbox toggle onChange={changeTheme} color="black" checked={theme === THEME.DARK} />
          <Icon className="toggle_theme__icon" name="moon" size="large" />
        </div>
        <Menu.Item className="main-menu__item" name={isAuth ? t('exit') : t('signinButton')} onClick={handleSignInAndLogOut} />
        {!isAuth && <Menu.Item className="main-menu__item" name={t('signupButton')} onClick={handleClick(ROUTES.SIGNUP)} />}
      </Menu.Menu>
    </Menu>
  );
};
export default MainMenu;

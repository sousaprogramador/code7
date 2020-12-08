import React, { useState, useCallback, memo, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import { useDebouncedEffect } from 'helpers/debounce';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: 'black',
    fontSize: 20,
  },
  toolbar: {
    minHeight: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    paddingRight: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'black',
    borderBottom: '1px solid #757575',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchAppBar = memo(({ handleSearch, disableSearch, title }) => {
  const classes = useStyles();

  const [filterName, setFilterName] = useState('');
  const [firtsRun, setFirstRun] = useState(true);

  const search = () => !firtsRun && handleSearch(filterName);

  useDebouncedEffect(() => search(), 800, [filterName]);

  const handleChange = ({ target }) => {
    setFirstRun(false);
    setFilterName(target.value);
  };

  const renderClearButton = useCallback(
    () =>
      filterName.trim().length > 1 && (
        <IconButton
          component="span"
          size="small"
          onClick={() => setFilterName('')}
        >
          <CloseIcon color="disabled" />
        </IconButton>
      ),
    [filterName],
  );

  return (
    <div className={classes.root}>
      <AppBar style={{ background: 'white' }} position="static">
        <Toolbar className={classes.toolbar}>
          <div className="d-none d-lg-block">
            <h3 className={classes.title}>{title || ''}</h3>
          </div>

          {!disableSearch && (
            <div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon color="disabled" />
                </div>

                <InputBase
                  placeholder="Pesquisar"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={filterName}
                  onChange={handleChange}
                />

                {renderClearButton()}
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default SearchAppBar;

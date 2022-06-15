import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useHistory } from "react-router-dom";


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 14,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(3),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.grey[300],
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {
  const history = useHistory()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenWord = () => {
    history.push("/covid-news/world")
    setAnchorEl(null);

  };
  const handleOpenVaccine = () => {
    history.push("/covid-news/vaccine")
    setAnchorEl(null);

  };
  const handleOpenVN = () => {
    history.push("/covid-news/vietnam")
    setAnchorEl(null);

  };
  const handleOpenNews = () => {
    history.push("/covid-news/news")
    setAnchorEl(null);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        textTransform= 'lowercase'
        endIcon={<KeyboardArrowDownIcon />}

      >
        About Covid
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenWord}>
          <EditIcon />
          World
        </MenuItem>
        <MenuItem onClick={handleOpenVaccine} disableRipple>
          <FileCopyIcon />
          Vaccine
        </MenuItem>
        {/* <Divider sx={{ my: 0.5 }} /> */}
        <MenuItem onClick={handleOpenVN} disableRipple>
          <ArchiveIcon />
          Viet Nam
        </MenuItem>
        <MenuItem onClick={handleOpenNews} disableRipple>
          <MoreHorizIcon />
          News
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

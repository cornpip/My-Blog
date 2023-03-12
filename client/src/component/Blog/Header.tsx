import { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom'
import Switch from '@mui/material/Switch';
import AuthAPI from '../../api/auth';
import BasicModal from '../Modal/BasicModal';
import { BlogHeaderProps } from '../../interface/blog.interface';
import Grid from '@mui/material/Grid';

export default function Header(props: BlogHeaderProps) {
  const { sections, title } = props;
  const [login, setLogin] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  async function loginCheck() {
    console.log("login check");
    try {
      setLogin(await AuthAPI.check());
    } catch (e) {
      setLogin(false);
    }
  }

  async function signinHandler() {
    console.log("signin handler");
    await AuthAPI.signin({ email: "chdnjf13755@naver.com", password: "1234" });
    //signin이 성공적이면
    loginCheck();
    return;
  }

  async function yesHandler() {
    setOpen(false);
    logoutHandler();
  }

  async function noHandler() {
    setOpen(false);
  }

  async function loginHandler() {
    console.log("login handler");
    if (login) {
      //login상태라면 모달창 띄우고 로그아웃하시겠습니까
      setOpen(true);
    } else {
      //logout상태라면 로그인page로
      navigate(`${process.env.REACT_APP_ROOT}/signin`);
    }
    return;
  }

  async function logoutHandler() {
    console.log("logout handler");
    await AuthAPI.logout();
    loginCheck();
    return;
  }

  useEffect(() => {
    loginCheck();
  }, [])

  //Switch관련
  // All form controls should have labels, and this includes radio buttons, checkboxes, and switches.
  // When a label can't be used, it's necessary to add an attribute directly to the input component.
  // const label = { inputProps: { 'aria-label': 'Switch A' } };
  // label tag 사용하자.


  //grid로 바꾸자
  return (
    <Grid container>
      <BasicModal open={open} setOpen={setOpen} text={`
        Are you sure you want to log out?`} yesHandler={yesHandler} noHandler={noHandler} />
      <Grid item xs={12}>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Button size="medium">Contact</Button>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
          >
            {title}
          </Typography>
          <label>
            <Switch color="secondary"
              checked={login}
              onChange={loginHandler} />
          </label>
          <Switch defaultChecked
            onChange={signinHandler} />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </Grid>
      <Grid item xs={12}>
        <Toolbar
          component="nav"
          variant="dense"
          sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
        >
          {sections.map((section) => (
            <Link
              to={`./${section.title}`}
              key={section.title}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
      </Grid>

      <Grid container justifyContent="space-between" spacing={4}>
        {sections.map((section) => (
          <Grid item>
            <Link
              to={`./${section.title}`}
              key={section.title}
            >
              {section.title}
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}



{/* <Toolbar
component="nav"
variant="dense"
sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
>
{sections.map((section) => (
  <Link
    to={`./${section.title}`}
    key={section.title}
  >
    {section.title}
  </Link>
))}
</Toolbar> */}
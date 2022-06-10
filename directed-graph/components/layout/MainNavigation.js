import classes from './MainNavigation.module.css';
import Link from 'next/link'
function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Finding the Shortest Past</div>
    </header>
  );
}

export default MainNavigation;
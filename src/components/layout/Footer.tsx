import { Box, Typography, Link } from "@mui/material";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <Box className={styles.footer}>
      <Box className={styles.inner}>
        
        <Typography className={styles.brand}>
          DailyDash Pro
        </Typography>

        <Typography className={styles.copy}>
          © {new Date().getFullYear()} All rights reserved
        </Typography>

        <Box className={styles.links}>
          <Link href="#" className={styles.link}>Privacy</Link>
          <Link href="#" className={styles.link}>Terms</Link>
          <Link href="#" className={styles.link}>Support</Link>
        </Box>

      </Box>
    </Box>
  );
}

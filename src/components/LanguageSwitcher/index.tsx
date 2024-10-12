import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  sx?: object;
}

/**
 * LanguageSwitcher component allows users to switch between available languages.
 *
 * @param {object} sx - Optional styles to customize the component.
 */
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ sx }) => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const availableLanguages = ["es", "en"];
  const currentLanguage = i18n.language;
  const languagesToDisplay = availableLanguages.filter(
    (lang) => lang !== currentLanguage
  );

  /**
   * Opens the language selection menu.
   *
   * @param {React.MouseEvent<HTMLElement>} event - The event triggered by clicking the button.
   */
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Closes the language selection menu.
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /**
   * Changes the current language.
   *
   * @param {string} lang - The language code to switch to.
   */
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    handleMenuClose();
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="change language"
        onClick={handleMenuOpen}
        sx={sx}
      >
        <LanguageIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "language-switcher",
        }}
      >
        {languagesToDisplay.map((lang) => (
          <MenuItem key={lang} onClick={() => handleLanguageChange(lang)}>
            {lang === "es" ? "Español" : "English"}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;

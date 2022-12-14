import React, { Fragment } from "react";

import classnames from "classnames";
import { colorPalette } from "./ColorPalette";
import tinycolor from "tinycolor2";
import { useDarkMode } from "storybook-dark-mode";

const ColorStory = () => {
  const isDarkMode = useDarkMode();
  const theme = isDarkMode ? "dark" : "light";
  return (
    <div
      className={classnames(
        "demo-color-swatch-wrapper p-10 rounded border neeto-ui-border-gray-300",
        {
          "neeto-ui-theme--dark": isDarkMode,
        }
      )}
    >

      {Object.entries(colorPalette).map(([key, { title, colors }]) => (
        <Fragment key={key}>
          <h5 className="mb-2 neeto-ui-text-black">{title}</h5>
          <div className="flex flex-wrap gap-5 mb-10 demo-color-swatch-wrapper__row">
            {colors.map(({ name, value, text = "white" }) => (
              <div
                key={name}
                className={classnames(
                  "demo-color-swatch border neeto-ui-border-gray-300",
                  name.replace("neeto-ui", "neeto-ui-bg"),
                  {
                    "neeto-ui-text-black": text === "black",
                    "neeto-ui-text-white": text === "white",
                  }
                )}
              >
                <code>--{name}</code>
                <code>{value[theme]}</code>
                <code>#{tinycolor(`rgb(${value[theme]})`).toHex()}</code>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default ColorStory;

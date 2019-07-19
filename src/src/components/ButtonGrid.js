import React from "react";
import { Button, Icon, Label } from "semantic-ui-react";

const ButtonGrid = ({
  presetLine,
  presetFlower,
  presetCross,
  presetPlus,
  playButton,
  pauseButton,
  clear,
  setSpeed,
  slow,
  normal,
  fast,
  setGridSize,
  small,
  medium,
  large
}) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Label style={{ marginBottom: "10px" }}>Choose a preset</Label>
          <div>
            <Button onClick={presetLine} primary>
              Center Line
            </Button>
            <Button onClick={presetFlower} primary>
              Flower
            </Button>
            <Button onClick={presetCross} primary>
              Cross
            </Button>
            <Button onClick={presetPlus} primary>
              Plus
            </Button>
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <div>
            <Button.Group labeled icon>
              <Button
                style={{ marginRight: "5px" }}
                onClick={playButton}
                icon="play"
                content="Play"
              />
            </Button.Group>
            <Button.Group labeled icon>
              <Button
                style={{ marginRight: "5px" }}
                onClick={pauseButton}
                icon="pause"
                content="Pause"
              />
            </Button.Group>
            <Button.Group labeled icon>
              <Button
                style={{ marginRight: "5px" }}
                onClick={clear}
                icon="undo"
                content="Clear"
              />
            </Button.Group>
          </div>
        </div>
        {/* speed */}
        <div>
          <Label style={{ marginBottom: "10px", marginTop: "20px" }}>
            Choose a speed
          </Label>
          <div style={{ marginTop: "5px" }}>
            <Button.Group labeled>
              <Button
                style={{ marginRight: "5px" }}
                onClick={() => setSpeed(slow)}
                content="Slow"
              />
            </Button.Group>
            <Button.Group labeled>
              <Button
                style={{ marginRight: "5px" }}
                onClick={() => setSpeed(normal)}
                content="Normal"
              />
            </Button.Group>
            <Button.Group labeled>
              <Button
                style={{ marginRight: "5px" }}
                onClick={() => setSpeed(fast)}
                onClick={clear}
                content="Fast"
              />
            </Button.Group>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Label style={{ marginBottom: "10px", marginTop: "20px" }}>
              Choose a grid size
            </Label>
            <div>
              <Button.Group labeled>
                <Button
                  style={{ marginRight: "5px" }}
                  onClick={() => setGridSize(small)}
                  content="Small"
                />
              </Button.Group>
              <Button.Group labeled>
                <Button
                  style={{ marginRight: "5px" }}
                  onClick={() => setGridSize(medium)}
                  content="Normal"
                />
              </Button.Group>
              <Button.Group labeled>
                <Button
                  style={{ marginRight: "5px" }}
                  onClick={() => setGridSize(large)}
                  content="Large"
                />
              </Button.Group>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonGrid;

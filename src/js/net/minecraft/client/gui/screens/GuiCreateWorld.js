import GuiScreen from "../GuiScreen.js";
import GuiButton from "../widgets/GuiButton.js";
import World from "../../world/World.js";
import GuiTextField from "../widgets/GuiTextField.js";
import Random from "../../../util/Random.js";

export default class GuiCreateWorld extends GuiScreen {

    constructor(previousScreen) {
        super();

        this.previousScreen = previousScreen;
    }

    init() {
        super.init();

        let y = this.height / 2 - 50;

        this.fieldSeed = new GuiTextField(this.width / 2 - 100, y + 30, 200, 20)
        this.fieldSeed.maxLength = 30;
        this.buttonList.push(this.fieldSeed);

        this.buttonList.push(new GuiButton("Create New World", this.width / 2 - 155, y + 110, 150, 20, () => {
            let seed = this.fieldSeed.getText();
            if (seed.length === 0) {
                seed = new Random().nextLong();
            }
            this.minecraft.loadWorld(new World(this.minecraft, seed));
        }));
        this.buttonList.push(new GuiButton("Cancel", this.width / 2 + 5, y + 110, 150, 20, () => {
            this.minecraft.displayScreen(this.previousScreen);
        }));
    }

    drawScreen(stack, mouseX, mouseY, partialTicks) {
        // Background
        this.drawDefaultBackground(stack);

        // Title
        this.drawCenteredString(stack, "Create New World", this.width / 2, 50);

        let y = this.height / 2 - 50;

        // Seed
        this.drawString(stack, "Seed for the World Generator", this.width / 2 - 100, y + 17, -6250336);
        this.drawString(stack, "Leave blank for a random seed", this.width / 2 - 100, y + 55, -6250336);

        super.drawScreen(stack, mouseX, mouseY, partialTicks);
    }

    onClose() {

    }

}
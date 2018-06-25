var Render = function() {
    var canvas = document.getElementById("battleships");
    var ctx = canvas.getContext("2d");
    
    this.drawGame = function(state) {
        switch(state.page) {
            case "Home":
                this.drawHomePage(state);
                break;
            default:
                break;
        }
    }.bind(this);
}

export default Render;
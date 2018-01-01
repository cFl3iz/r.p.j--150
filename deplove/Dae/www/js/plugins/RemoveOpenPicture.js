(
function (){

Scene_Boot.prototype.start = function() {
Scene_Base.prototype.start.call(this);
SoundManager.preloadImportantSounds();
if (DataManager.isBattleTest()) {
DataManager.setupBattleTest();
SceneManager.goto(Scene_Battle);
} else if (DataManager.isEventTest()) {
DataManager.setupEventTest();
SceneManager.goto(Scene_Map);
} else {
this.checkPlayerLocation();
DataManager.setupNewGame();
if(DataManager.isAnySavefileExists()){
new Scene_Load().onSavefileOk();
}else{
SceneManager.goto(Scene_Map);
}
//Window_TitleCommand.initCommandPosition();
}
this.updateDocumentTitle();
};

Scene_Load.flag = true;

Scene_Load.prototype.onSavefileOk = function() {
Scene_File.prototype.onSavefileOk.call(this);
var load = null;
if(Scene_Load.flag){
load = DataManager.loadGame(1)
}else{
load = DataManager.loadGame(this.savefileId());
}
if (load) {
this.onLoadSuccess();
} else {
this.onLoadFailure();
}
};

Scene_Load.prototype.onLoadSuccess = function() {
if(Scene_Load.flag){
Scene_Load.flag = false;
}else{
SoundManager.playLoad();
}
this.fadeOutAll();
this.reloadMapIfUpdated();
SceneManager.goto(Scene_Map);
this._loadSuccess = true;
};

var Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
Scene_Menu_createCommandWindow.call(this);
this._commandWindow.setHandler('read', this.commandRead.bind(this));
};

Scene_Menu.prototype.commandRead = function() {
SceneManager.push(Scene_Load);
};

Window_MenuCommand.prototype.makeCommandList = function() {
this.addMainCommands();
this.addFormationCommand();
this.addOriginalCommands();
this.addOptionsCommand();
this.addReadCommands();
this.addSaveCommand();
this.addGameEndCommand();
};

Window_MenuCommand.prototype.addReadCommands = function(){
this.addCommand(TextManager.continue_, 'read', DataManager.isAnySavefileExists());
};

Scene_Menu.prototype.commandGameEnd = function() {
this.fadeOutAll();
SceneManager.exit();
};
}
)()
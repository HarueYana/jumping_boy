let angle = 0;

// ジャンプに関する状態管理変数（少年用）
let isJumping = false;
let jumpTimer = 0;
const jumpDuration = 30; 
const maxJumpHeight = 60; 
const maxLegSpread = 15;  
const maxHeadBounce = 12; 
let maxArmLift; 

// ★草のトス（放り投げ）用変数
const maxGrassThrow = 45; // 草が手から離れて上に飛ぶ高さ
let currentGrassThrowHeight = 0;

// ジャンプに関する状態管理変数（子犬用）
const maxPuppyJumpHeight = 40; 
const maxPuppyLegSpread = 8;   
const maxPuppyHeadBounce = 6;  

let currentJumpHeight = 0;
let currentLegSpread = 0;
let currentHeadBounce = 0;
let currentArmLift = 0; 

let currentPuppyJumpHeight = 0;
let currentPuppyLegSpread = 0;
let currentPuppyHeadBounce = 0;

function setup() {
  createCanvas(400, 400, WEBGL); 
  noStroke(); 
  maxArmLift = PI / 2.5; 
}

function draw() {
  background(240, 248, 255);
  
  orbitControl(); 

  ambientLight(120); 
  directionalLight(255, 255, 255, 1, 1, -1); 

  // ジャンプのアニメーションロジック
  if (isJumping) {
    jumpTimer++;
    if (jumpTimer <= jumpDuration) {
      let progress = jumpTimer / jumpDuration; 
      let jumpPhase = progress * PI;
      let h = sin(jumpPhase); 
      
      // 少年のジャンプ計算
      currentJumpHeight = h * maxJumpHeight;
      currentLegSpread = h * maxLegSpread;
      currentHeadBounce = h * maxHeadBounce; 
      currentArmLift = h * maxArmLift;
      
      // ★草が上に跳ね上がる高さの計算
      currentGrassThrowHeight = h * maxGrassThrow;
      
      // 子犬のジャンプ計算
      currentPuppyJumpHeight = h * maxPuppyJumpHeight;
      currentPuppyLegSpread = h * maxPuppyLegSpread;
      currentPuppyHeadBounce = h * maxPuppyHeadBounce;
      
    } else {
      isJumping = false;
      currentJumpHeight = 0;
      currentLegSpread = 0;
      currentHeadBounce = 0;
      currentArmLift = 0;
      currentGrassThrowHeight = 0; // 草の高さもリセット
      
      currentPuppyJumpHeight = 0;
      currentPuppyLegSpread = 0;
      currentPuppyHeadBounce = 0;
      jumpTimer = 0;
    }
  }

  // 空間全体を回す
  rotateY(angle);
  
  // ==========================================
  // 少年の描画グループ
  // ==========================================
  push(); 
  translate(0, 30 - currentJumpHeight, 0); 

  // 1. 体
  push();
  fill(100, 150, 220);
  box(50, 60, 30); 
  pop();

  // 2. 頭
  push();
  translate(0, -40 - currentHeadBounce, 0); 
  fill(255, 220, 200);
  sphere(22);
  translate(0, -4, 0);
  fill(139, 69, 19);
  sphere(23);
  pop();

  // 3. 足
  push();
  translate(-15 - currentLegSpread, 45, 0);
  fill(50, 50, 50);
  box(15, 30, 15);
  pop();
  
  push();
  translate(15 + currentLegSpread, 45, 0);
  fill(50, 50, 50);
  box(15, 30, 15);
  pop();

  // 4. 左腕
  push();
  translate(-30, -5, 0); 
  rotateZ(PI / 2.5 + currentArmLift); 
  fill(255, 220, 200);
  cylinder(6, 45); 
  translate(0, 22.5, 0); 
  sphere(8); 
  pop();

  // 5. 右腕（草を持っていた腕）
  // ※ここから草の描画を外に出しました
  push();
  translate(30, -5, 0); 
  rotateZ(-PI / 2 - currentArmLift); 
  fill(255, 220, 200);
  cylinder(6, 40); 
  translate(0, 20, 0); 
  sphere(8); 
  pop(); 

  // 6. 草（腕から独立して描画）
  push();
  // ★腕の角度から、手のひらの現在の位置(X, Y)を数学的に計算する
  let handX = 30 + 20 * cos(currentArmLift);
  let handY = -5 - 20 * sin(currentArmLift);
  
  // 手のひらの位置に移動し、そこからさらに currentGrassThrowHeight 分だけ上に飛ばす
  translate(handX, handY - currentGrassThrowHeight, 0);
  
  // 草が常に上を向いた状態（回転しない状態）で描画
  translate(0, -35, 0); // 草の根元を手元に合わせる
  
  fill(34, 139, 34);    
  cylinder(2, 70);      
  
  push();
  translate(0, 10, 0);
  rotateZ(PI / 4); 
  cone(4, 30); 
  pop();
  
  push();
  translate(0, -10, 0);
  rotateZ(-PI / 4); 
  cone(4, 30);
  pop();
  pop(); // 草のグループ終了

  pop(); // 少年のグループ終了


  // ==========================================
  // 子犬の描画グループ
  // ==========================================
  push();
  translate(-60, 73 - currentPuppyJumpHeight, 60); 

  fill(210, 140, 70); 

  // 胴体
  box(20, 15, 30);

  // 頭
  push();
  translate(0, -12 - currentPuppyHeadBounce, 15); 
  sphere(12);
  
  push();
  translate(0, 2, 10);
  fill(245, 222, 179); 
  sphere(7);
  translate(0, -2, 6);
  fill(30);
  sphere(2.5);
  pop();

  // 耳
  fill(139, 69, 19); 
  push(); translate(-10, -3, 0); rotateZ(PI / 6); box(4, 12, 8); pop();
  push(); translate(10, -3, 0); rotateZ(-PI / 6); box(4, 12, 8); pop();
  pop();

  // 尻尾
  push(); translate(0, -5, -15); rotateX(PI / 4); fill(210, 140, 70); cylinder(2, 15); pop();

  // 足
  fill(210, 140, 70);
  push(); translate(-6 - currentPuppyLegSpread, 12, 10); box(4, 10, 4); pop(); 
  push(); translate(6 + currentPuppyLegSpread, 12, 10); box(4, 10, 4); pop();  
  push(); translate(-6 - currentPuppyLegSpread, 12, -10); box(4, 10, 4); pop();
  push(); translate(6 + currentPuppyLegSpread, 12, -10); box(4, 10, 4); pop(); 

  pop(); // 子犬のグループ終了

  angle += 0.03;
}

function mouseClicked() {
  if (!isJumping) {
    isJumping = true;
    jumpTimer = 0; 
  }
}
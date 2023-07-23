import Player from "../player";
import Enemy from "../enemies/enemy";
import Projectile from "../projectiles/projectile";
import Explosion from "../explosions/explosion";

type CollisionEnabled = Player | Enemy | Projectile | Explosion;

export function areObjectsColliding(
    firstObj: CollisionEnabled,
    secondObj: CollisionEnabled
) {
    if (
        firstObj.x + firstObj.width >= secondObj.x &&
        firstObj.x < secondObj.x + secondObj.width &&
        firstObj.y + firstObj.height >= secondObj.y &&
        firstObj.y < secondObj.y + secondObj.height
    ) {
        return true;
    } else {
        return false;
    }
}

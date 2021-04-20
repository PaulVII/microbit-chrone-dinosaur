function bewegeDinoUm (pixel: number) {
    for (let Index = 0; Index <= Math.abs(pixel) - 1; Index++) {
        if (pixel > 0) {
            dino.change(LedSpriteProperty.Y, -1)
        } else {
            dino.change(LedSpriteProperty.Y, 1)
        }
        basic.pause(100 + Index * 100)
    }
    return 0
}
function berührt (dino: game.LedSprite, hindernis: game.LedSprite) {
    return dino.get(LedSpriteProperty.X) == hindernis.get(LedSpriteProperty.X) && dino.get(LedSpriteProperty.Y) == hindernis.get(LedSpriteProperty.Y)
}
input.onButtonPressed(Button.A, function () {
    bewegeDinoUm(3)
    basic.pause(500)
    bewegeDinoUm(-3)
})
function neuesHindernis () {
    for (let hindernis of hindernisse) {
        hindernis.delete()
    }
    hindernisse = [game.createSprite(4, 3)]
    if (Math.randomBoolean()) {
        hindernisse.push(game.createSprite(4, 2))
    } else {
        hindernisse.push(game.createSprite(4, 4))
    }
}
input.onButtonPressed(Button.B, function () {
    bewegeDinoUm(-1)
    basic.pause(1000)
    bewegeDinoUm(1)
})
function bewegeHindernis () {
    for (let hindernis of hindernisse) {
        hindernis.change(LedSpriteProperty.X, -1)
    }
    basic.pause(500)
    if (keinHindernisMehr()) {
        game.addScore(1)
        neuesHindernis()
    }
}
function keinHindernisMehr () {
    return hindernisse[0].get(LedSpriteProperty.X) == 0
}
let hindernisse: game.LedSprite[] = []
let dino: game.LedSprite = null
game.setLife(3)
dino = game.createSprite(0, 3)
neuesHindernis()
basic.forever(function () {
    bewegeHindernis()
    for (let hindernis of hindernisse) {
        if (berührt(dino, hindernis)) {
            game.removeLife(1)
            break;
        }
    }
})

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
input.onButtonPressed(Button.A, function () {
    music.playMelody("- - - - - - - - ", 120)
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
        hindernisse.push(game.createSprite(4, 1))
        hindernisse.push(game.createSprite(4, 0))
    } else {
        hindernisse.push(game.createSprite(4, 4))
    }
}
function init () {
    punkte = 0
    Leben = 3
    neuesHindernis()
}
input.onButtonPressed(Button.B, function () {
    bewegeDinoUm(-1)
    basic.pause(1000)
    bewegeDinoUm(1)
})
function bewegeHindernis () {
    punkte += 1
    if (keinHindernisMehr()) {
        neuesHindernis()
    } else {
        for (let hindernis of hindernisse) {
            hindernis.change(LedSpriteProperty.X, -1)
        }
    }
}
function keinHindernisMehr () {
    return hindernisse[0].get(LedSpriteProperty.X) == 0
}
function berührtHindernis () {
    for (let hindernis of hindernisse) {
        if (hindernis.isTouching(dino)) {
            return true
        }
    }
    return false
}
let Leben = 0
let punkte = 0
let hindernisse: game.LedSprite[] = []
let dino: game.LedSprite = null
dino = game.createSprite(0, 3)
init()
basic.forever(function () {
    basic.pause(500)
    bewegeHindernis()
    if (berührtHindernis()) {
        Leben += -1
        if (Leben == 0) {
            basic.showString("" + (punkte))
            init()
        }
    }
})

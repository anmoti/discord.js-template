# Discord.js用のTemplate

Discord.jsのBotのテンプレートです。

# 使い方

## ①. [ここ](https://discord.com/developers/applications) からBotをつくる。

**NewApplication** > **Name** にBotの名前を入れる。 > **Create** > **Bot** > **AddBot** > **Yes,doit!** でBotを作成。

botを自分のサーバーに入れておき、Tokenをコピーしておく。

わからなかったらググってくれ

## ②. [ここ](https://nodejs.org/) からNode.jsをインストールする。

Node.jsをインストールするときに設定などはそのままNextを押し続けてください。

変な広告とかはないです。(npmというものも一緒にインストールされます。消さないでください。)

## ③. 適当なディレクトリにファイルをすべてダウンロード&解凍する。

ダウンロードは **[ここ](https://github.com/anmoti/discord.js-template/releases/)** から最新版の sourcecode(.zip) をクリックでダウンロードできます。

## ④. **インストール.bat** を起動する。

場所を移動させないでください。

## ⑤. **consfig.json** を開いてDiscordのBotのtokenを <<ここにtoken>> のところに貼り付けする。

①で作ったtokenです。下記になるように張り付けてください。

```  
{
    "prefix": "!",
    "token": "XXX0XX0XX.XXXXXXXXxXXX.XXXxX0XXXxxXXxXXxXXxXXXX0x.XXXXXXXXX"
}
```

## ⑥. **起動用.bat** を起動。

ユーザー名#0000(012345678901234567) でログインしていますと出たら起動完了。

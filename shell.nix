{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell rec {
    buildInputs = with pkgs; [
        rustup
        cargo
        gcc
        cmake
    ];
    HISTFILE = toString ./.history;
    shellHook = ''
        rustup override set nightly
    '';
}
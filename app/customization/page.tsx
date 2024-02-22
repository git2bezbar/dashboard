'use client';

import React from "react";
import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import {
  Button,
  Color,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@fork2e/umbrella";

export default function Customization() {
  return (
    <>
      <PageHeading>
        <Title>Personnalisation</Title>
        <Subtitle>Cras elementum mi a libero sagittis sollicitudin. Quisque eleifend dapibus justo, sed euismod ipsum hendrerit non. Donec mollis semper elit.</Subtitle>
      </PageHeading>
      <div className="grid grid-cols-12 items-start">
        <form className="col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Header</h2>
            <div className="flex flex-col justify-start items-start gap-4">
              <h3 className="text-md font-bold">Agencement du header</h3>
              <RadioGroup className="flex flex-col items-start gap-4" defaultValue="left">
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="left" id="left" />
                  <Label htmlFor="left">Alignement à gauche</Label>
                </div>
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="center" id="center" />
                  <Label htmlFor="center">Centré</Label>
                </div>
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="right" id="right"/>
                  <Label htmlFor="right">Alignement à droite</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Générale</h2>
            <div className="flex flex-col justify-start items-start gap-4">
              <Label className="font-bold">Thème</Label>
              <Select>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Choisissez votre thème" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Thème 1</SelectItem>
                  <SelectItem value="2">Thème 2</SelectItem>
                  <SelectItem value="3">Thème 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              <Label className="font-bold" htmlFor="primaryColor">Couleur principale</Label>
              {/* <Color currentColor="#6624FF"/> */}
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              <Label className="font-bold" htmlFor="secondaryColor">Couleur secondaire</Label>
              {/* <Color currentColor="#6624FF"/> */}
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              <Label className="font-bold">Police des titres</Label>
              <Select>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Choisissez la police des titres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poppins">Poppins</SelectItem>
                  <SelectItem value="raleway">Raleway</SelectItem>
                  <SelectItem value="dm-sans">DM Sans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              <Label className="font-bold">Police des textes</Label>
              <Select>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Choisissez la police des textes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poppins">Poppins</SelectItem>
                  <SelectItem value="raleway">Raleway</SelectItem>
                  <SelectItem value="dm-sans">DM Sans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              <Label className="font-bold">Police des boutons</Label>
              <Select>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Choisissez la police des boutons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poppins">Poppins</SelectItem>
                  <SelectItem value="raleway">Raleway</SelectItem>
                  <SelectItem value="dm-sans">DM Sans</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Footer</h2>
            <div className="flex flex-col justify-start items-start gap-4">
              <h3 className="text-md font-bold">Agencement du footer</h3>
              <RadioGroup className="flex flex-col items-start gap-4" defaultValue="left">
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="left" id="left" />
                  <Label htmlFor="left">Alignement à gauche</Label>
                </div>
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="center" id="center" />
                  <Label htmlFor="center">Centré</Label>
                </div>
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="right" id="right"/>
                  <Label htmlFor="right">Alignement à droite</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <Button className="self-start">Sauvegarder les changements</Button>
        </form>
      </div>
    </> 
  )
}

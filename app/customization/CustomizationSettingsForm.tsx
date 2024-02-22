'use client';

import { updateCustomizationSettings } from "@/services/api/customization";
import { CustomizationSettings } from "@/services/types";
import { mockState } from "@/services/utils";
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
import { FormEvent, useReducer } from "react";

export interface CustomizationSettingsFormProps {
  settings: CustomizationSettings;
}

export default function CustomizationSettingsForm({ settings: providedSettings }:CustomizationSettingsFormProps) {

  const [state, dispatch] = useReducer(mockState, {
    settings: { ...providedSettings },
    oldSettings: { ...providedSettings },
    dirty: false,
  });

  const updateSetting = (key:string, field:any) => {
    const updatedSettings = {
      ...state.settings,
      [key]: field.target?.value || field,
    }
    dispatch({
      dirty: true,
      settings: { ...updatedSettings },
    });
  };

  const resetSettings = (e:FormEvent) => {
    e.preventDefault();
    dispatch({
      dirty: false,
      settings: { ...state.oldSettings },
    });
  };

  const submitUpdatedSettings = (e:FormEvent) => {
    e.preventDefault();
    // todo - make this thing async if possible
    updateCustomizationSettings('1bcc2d88-43e2-47f9-a009-d7a2418604df', state.settings);
    dispatch({
      dirty: false,
      oldSettings: { ...state.settings },
    });
  };

  return (
    <form className="col-span-5 flex flex-col gap-8" onSubmit={submitUpdatedSettings}>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Header</h2>
        <div className="flex flex-col justify-start items-start gap-4">
          <h3 className="text-md font-bold">Agencement du header</h3>
          <RadioGroup
            className="flex flex-col items-start gap-4"
            value={state.settings.headerLayout}
            onValueChange={updateSetting.bind(null, "headerLayout")}
          >
            <div className="flex items-center gap-4">
              <RadioGroupItem value="1" id="left" />
              <Label htmlFor="left">Alignement à gauche</Label>
            </div>
            <div className="flex items-center gap-4">
              <RadioGroupItem value="2" id="center"/>
              <Label htmlFor="center">Centré</Label>
            </div>
            <div className="flex items-center gap-4">
              <RadioGroupItem value="3" id="right"/>
              <Label htmlFor="right">Alignement à droite</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Générale</h2>
        <div className="flex flex-col justify-start items-start gap-4">
          <Label className="font-bold">Thème</Label>
          <Select
            value={state.settings.theme}
            onValueChange={updateSetting.bind(null, "theme")}
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue
                placeholder="Choisissez votre thème" 
              />
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
          <Select
            value={state.settings.titleFont}
            onValueChange={updateSetting.bind(null, "titleFont")}
          >
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
          <Select 
            value={state.settings.textFont}
            onValueChange={updateSetting.bind(null, "textFont")}
          >
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
          <Select
            value={state.settings.buttonFont}
            onValueChange={updateSetting.bind(null, "buttonFont")}
          >
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
          <RadioGroup
            className="flex flex-col items-start gap-4"
            value={state.settings.footerLayout}
            onValueChange={updateSetting.bind(null, "footerLayout")}
          >
            <div className="flex items-center gap-4">
              <RadioGroupItem value="1" id="one" />
              <Label htmlFor="one">Agencement 1</Label>
            </div>
            <div className="flex items-center gap-4">
              <RadioGroupItem value="2" id="two" />
              <Label htmlFor="two">Agencement 2</Label>
            </div>
            <div className="flex items-center gap-4">
              <RadioGroupItem value="3" id="three" />
              <Label htmlFor="three">Agencement 3</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="flex gap-4">
        <Button disabled={!state.dirty}>Sauvegarder les changements</Button>
        <Button disabled={!state.dirty} variant="subtle" onClick={resetSettings}>Annuler</Button>
      </div>
    </form>
  )
}
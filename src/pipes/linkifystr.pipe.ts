import { Pipe, PipeTransform } from "@angular/core";
import linkifyStr, * as linkifiStr from 'linkifyjs/string';

 @Pipe({name:'linkifystr'})
 export class LinkifystrPipe implements PipeTransform{
     transform(str: string): string{
         return str ? linkifyStr(str, {target:'_system'}) : str;
     }
 }

// types/vue3-card-flip.d.ts
declare module 'vue3-card-flip' {
    import { DefineComponent } from 'vue'
    
    interface CardFlipProps {
      state?: string;
      duration?: number;
      [key: string]: any;
    }
    
    const CardFlip: DefineComponent<CardFlipProps>
    
    export default CardFlip
  }
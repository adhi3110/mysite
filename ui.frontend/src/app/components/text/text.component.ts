import {ChangeDetectionStrategy, Component, computed, inject, input, InputSignal} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-text',
  imports: [],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-rte-editelement]': 'editAttribute',
    '[id]': 'id()'
  }
})
export class TextComponent {
  sanitizer = inject(DomSanitizer);

  richText: InputSignal<boolean> = input<boolean>(false);

  text: InputSignal<string> = input('')

  itemName: InputSignal<string> = input('')

  content = computed(() => {
    return this.richText() ? this.sanitizer.bypassSecurityTrustHtml(this.text()) : this.text();
  })

  editAttribute = true;

  cqType = input<string>('');

  dataLayer =  input('');

  cqPath = input('');

  id = input('');
}

var Embed = Quill.import('blots/embed');
class SInput extends Embed {
    static create(value) {
        let node = super.create(value);
        var input = document.createElement('input');
        input.placeholder = value;
        input.disabled = true;
        node.innerHTML = input.outerHTML;
        return node;
    }
}
SInput.blotName = 's-input';
SInput.tagName = 's-input';
Quill.register(SInput);

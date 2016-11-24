
class SAngularObj extends Embed {
    static create(value) {
        let node = super.create(value);
        var input = document.createElement('div');
        node.innerHTML = value;
        return node;
    }
}
SAngularObj.blotName = 's-angular';
SAngularObj.tagName = 's-angular';
Quill.register(SAngularObj);

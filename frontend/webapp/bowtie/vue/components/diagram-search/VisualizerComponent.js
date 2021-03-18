let VisualizerComponent = {

    template: '#visualizer-template',

    components: {},
    props: { //Link with parent, parent can send data with 'v-bind'. To go from child to parent $emit("param")
        isPublic:Boolean,
        nameInput:String,
        all_diagrams:Array,
        tags_selected:Array,
        show_all_tags: Boolean,
    },
    data: function () {
        return {

        }
    },
    methods: {
        //My functions
        openDiagram: function (diagram_name){
            chosen_diag = this.all_diagrams.find(d => d.name === diagram_name)
            var doc = mxUtils.parseXml(chosen_diag.diagram);
            window.parent.currentUI.editor.setGraphXml(doc.documentElement);
            window.parent.currentUI.editor.setGraphId(chosen_diag.id)
            window.parent.currentUI.editor.setModified(false);
            window.parent.currentUI.editor.undoManager.clear();

            if (diagram_name !== "") {
                window.parent.currentUI.editor.setFilename(diagram_name);
                //window.parent.currentUI.editor.updateDocumentTitle();
                // this.updateDocumentTitle();
            }
            window.parent.currentUI.hideDialog()
            //window.parent.close()

        },
    },
    computed: {// Sort of augmented variables. Seen by VueJs as variable but are actually func
        // beforeMount is launched at the creation of the component
        diagram_to_show: function () {
            return this.all_diagrams.filter(diag =>{
                let areTagsOk = this.show_all_tags
                for(const tag of diag.tags){
                    for(const tag_s of this.tags_selected){
                        if(tag === tag_s){
                            areTagsOk = true
                        }
                    }
                }
                let nameOk = (diag.name.indexOf(this.nameInput) > -1) || (this.nameInput==="")
                return diag.is_public === this.isPublic && nameOk && areTagsOk;
            })
        },
    },


}
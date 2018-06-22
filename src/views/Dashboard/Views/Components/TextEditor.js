import { Editor } from 'slate-react';
import Html from 'slate-html-serializer';


import React, {Component} from 'react';
import { isKeyHotkey } from 'is-hotkey';

import '@material/button/dist/mdc.button.min.css';
import '@material/ripple/dist/mdc.ripple.min.css';
import { Button } from 'rmwc/Button';
import { ButtonIcon } from "rmwc/Button/index";
import { Ripple } from 'rmwc/Ripple';

const BLOCK_TAGS = {
  blockquote: 'block-quote',
  p: 'paragraph',
  h1: 'heading-one',
  h2: 'heading-two'
};

const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underlined',
  pre: 'code'
};

const rules = [
  {
    deserialize( el, next ) {
      const type = BLOCK_TAGS[ el.tagName.toLowerCase() ];
      if ( type ) {
        return {
          object: 'block',
          type: type,
          data: {
            className: el.getAttribute( 'class' ),
          },
          nodes: next( el.childNodes )
        };
      }
    },
    serialize( obj, children ) {
      if ( obj.object === 'block' ) {
        switch ( obj.type ) {
          case 'paragraph':
            return <p className={ obj.data.get( 'className' ) }>{ children }</p>;
          case 'block-quote':
            return <blockquote>{ children }</blockquote>;
          case 'heading-one':
            return <h1>{ children }</h1>;
          case 'heading-two':
            return <h2>{ children }</h2>;
        }
      }
    }
  },
  {
    deserialize( el, next ) {
      const type = MARK_TAGS[ el.tagName.toLowerCase() ];
      if ( type ) {
        return {
          object: 'mark',
          type: type,
          nodes: next( el.childNodes )
        };
      }
    },
    serialize( obj, children ) {
      if ( obj.object == 'mark' ) {
        switch ( obj.type ) {
          case 'code':
            return (
              <pre>
                <code>{ children }</code>
              </pre>
            );
          case 'bold':
            return <strong>{ children }</strong>;
          case 'italic':
            return <em>{ children }</em>;
          case 'underlined':
            return <u>{ children }</u>;
        }
      }
    }
  }
];


export const html = new Html( { rules } );
const DEFAULT_NODE = 'paragraph';

const isBoldHotkey = isKeyHotkey( 'mod+b' );
const isItalicHotkey = isKeyHotkey( 'mod+i' );
const isUnderlinedHotkey = isKeyHotkey( 'mod+u' );
const isCodeHotkey = isKeyHotkey( 'mod+`' );

class TextEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: html.deserialize( '<p></p>' )
    };
  }

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some( mark => mark.type == type );
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some( node => node.type == type );
  };

  onChange = ( { value } ) => {
    this.setState( { value } );
  };

  onKeyDown = ( event, change ) => {
    let mark;

    if ( isBoldHotkey( event ) ) {
      mark = 'bold';
    } else if ( isItalicHotkey( event ) ) {
      mark = 'italic';
    } else if ( isUnderlinedHotkey( event ) ) {
      mark = 'underlined';
    } else if ( isCodeHotkey( event ) ) {
      mark = 'code';
    } else {
      return;
    }

    event.preventDefault();
    change.toggleMark( mark );
    return true;
  };

  onClickMark = ( event, type ) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark( type );
    this.onChange( change );
  };

  onClickBlock = ( event, type ) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change();
    const { document } = value;

    // Handle everything but list buttons.
    if ( type != 'bulleted-list' && type != 'numbered-list' ) {
      const isActive = this.hasBlock( type );
      const isList = this.hasBlock( 'list-item' );

      if ( isList ) {
        change
          .setBlocks( isActive ? DEFAULT_NODE : type )
          .unwrapBlock( 'bulleted-list' )
          .unwrapBlock( 'numbered-list' );
      } else {
        change.setBlocks( isActive ? DEFAULT_NODE : type );
      }
    } else {
      const isList = this.hasBlock( 'list-item' );
      const isType = value.blocks.some( block => {
        return !!document.getClosest( block.key, parent => parent.type == type );
      } );

      if ( isList && isType ) {
        change
          .setBlocks( DEFAULT_NODE )
          .unwrapBlock( 'bulleted-list' )
          .unwrapBlock( 'numbered-list' );
      } else if ( isList ) {
        change
          .unwrapBlock(
            type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock( type );
      } else {
        change.setBlocks( 'list-item' ).wrapBlock( type );
      }
    }

    this.onChange( change );
  };

  onSubmit = () => {
    const content = html.serialize( this.state.value );
    this.setState({value:html.deserialize('<p></p>')});
    this.props.onSubmit(content);
  };

  render() {
    return (
      <div>
        { this.renderToolbar() }
        { this.renderEditor() }
      </div>
    );
  }

  renderMarkButton = ( type, icon ) => {
    const isActive = this.hasMark( type );
    const onMouseDown = event => this.onClickMark( event, type );

    return (
      <Ripple>
      <span className="button" onMouseDown={ onMouseDown } data-active={ isActive }>
        <span className="material-icons">{ icon }</span>
      </span>
      </Ripple>
    );
  };

  renderBlockButton = ( type, icon ) => {
    let isActive = this.hasBlock( type );

    if ( [ 'numbered-list', 'bulleted-list' ].includes( type ) ) {
      const { value } = this.state;
      const parent = value.document.getParent( value.blocks.first().key );
      isActive = this.hasBlock( 'list-item' ) && parent && parent.type === type;
    }
    const onMouseDown = event => this.onClickBlock( event, type );

    return (
      <Ripple>
        <span className="button" onMouseDown={ onMouseDown } data-active={ isActive }>
          <span className="material-icons">{ icon }</span>
        </span>
      </Ripple>
    );
  };

  renderToolbar = () => {
    return (
      <div className="menu toolbar-menu">
        { this.renderMarkButton( 'bold', 'format_bold' ) }
        { this.renderMarkButton( 'italic', 'format_italic' ) }
        { this.renderMarkButton( 'underlined', 'format_underlined' ) }
        { this.renderMarkButton( 'code', 'code' ) }
        { this.renderBlockButton( 'heading-one', 'looks_one' ) }
        { this.renderBlockButton( 'heading-two', 'looks_two' ) }
        { this.renderBlockButton( 'block-quote', 'format_quote' ) }
        {/*{ this.renderBlockButton( 'numbered-list', 'format_list_numbered' ) }*/}
        {/*{ this.renderBlockButton( 'bulleted-list', 'format_list_bulleted' ) }*/}
        { this.renderButton() }
      </div>
    );
  };

  renderEditor = () => {
    return (
      <div className="editor menu-toolbar">
        <Editor
          placeholder="What's on your mind?"
          value={ this.state.value }
          onChange={ this.onChange }
          onKeyDown={ this.onKeyDown }
          renderNode={ this.renderNode }
          renderMark={ this.renderMark }
          spellCheck
          autoFocus
        />
      </div>
    );
  };

  renderButton = () => {
    return (
      <Button onClick={ this.onSubmit }
              className={ "float-right text-black-50" } dense>
        <ButtonIcon use="mode_comment"/>Post</Button>
    );
  };

  renderNode = props => {
    const { attributes, children, node } = props;
    switch ( node.type ) {
      case 'block-quote':
        return <blockquote { ...attributes }>{ children }</blockquote>;
      case 'bulleted-list':
        return <ul { ...attributes }>{ children }</ul>;
      case 'heading-one':
        return <h1 { ...attributes }>{ children }</h1>;
      case 'heading-two':
        return <h2 { ...attributes }>{ children }</h2>;
      case 'list-item':
        return <li { ...attributes }>{ children }</li>;
      case 'numbered-list':
        return <ol { ...attributes }>{ children }</ol>;
    }
  };

  renderMark = props => {
    const { children, mark, attributes } = props;
    switch ( mark.type ) {
      case 'bold':
        return <strong { ...attributes }>{ children }</strong>;
      case 'code':
        return <code { ...attributes }>{ children }</code>;
      case 'italic':
        return <em { ...attributes }>{ children }</em>;
      case 'underlined':
        return <u { ...attributes }>{ children }</u>;
    }
  };
}

export default TextEditor;

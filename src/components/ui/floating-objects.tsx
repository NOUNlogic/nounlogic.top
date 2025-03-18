// ...existing code...
      // Subtle camera movement
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      objects.forEach((obj) => {
        obj.mesh.geometry.dispose();
        (obj.mesh.material as THREE.Material).dispose();
        scene.remove(obj.mesh);
      });
    };
  }, [count, objectTypes, colors, minSize, maxSize, speed]);
  
  return (
    <div 
      ref={containerRef} 
      className={`floating-objects pointer-events-none ${className}`}
      style={{ position: 'absolute', inset: 0, zIndex: -5 }}
    />
  );
};

export default FloatingObjects;
